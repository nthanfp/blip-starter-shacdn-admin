import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Eye, EyeOff, Check, X } from "lucide-react";
import { toastHelper } from "@/lib/toast";
import { useAuthStore } from "@/store/authStore";

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "New password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type PasswordFormValues = z.infer<typeof passwordSchema>;

export function ChangePassword() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPasswordValue = form.watch("newPassword");

  const passwordRequirements = [
    { label: "At least 8 characters", met: newPasswordValue.length >= 8 },
    { label: "Contains uppercase", met: /[A-Z]/.test(newPasswordValue) },
    { label: "Contains lowercase", met: /[a-z]/.test(newPasswordValue) },
    { label: "Contains number", met: /[0-9]/.test(newPasswordValue) },
  ];

  const onSubmit = async (_data: PasswordFormValues) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toastHelper.success({
        title: "Success",
        description: "Password changed successfully.",
      });

      form.reset();
      navigate("/profile");
    } catch (error) {
      toastHelper.error({
        title: "Error",
        description: "Failed to change password.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePassword = (field: "current" | "new" | "confirm") => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/profile")}
          className="h-10 w-10"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Change Password</h1>
          <p className="text-muted-foreground">
            Update your password to keep your account secure
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Password Form */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Password Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Hidden username field for password managers */}
                <input
                  type="text"
                  name="username"
                  autoComplete="username"
                  className="hidden"
                  tabIndex={-1}
                  aria-hidden="true"
                  value={user?.email || ""}
                  readOnly
                />

                <FormField
                  control={form.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPasswords.current ? "text" : "password"}
                            placeholder="Enter current password"
                            autoComplete="current-password"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                            onClick={() => togglePassword("current")}
                          >
                            {showPasswords.current ? (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPasswords.new ? "text" : "password"}
                              placeholder="Min. 8 characters"
                              autoComplete="new-password"
                              {...field}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                              onClick={() => togglePassword("new")}
                            >
                              {showPasswords.new ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPasswords.confirm ? "text" : "password"}
                              placeholder="Re-enter password"
                              autoComplete="new-password"
                              {...field}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                              onClick={() => togglePassword("confirm")}
                            >
                              {showPasswords.confirm ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/profile")}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Changing..." : "Change Password"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Password Requirements */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Password Requirements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Your password must meet the following requirements:
            </p>
            <div className="space-y-2">
              {passwordRequirements.map((req) => (
                <div key={req.label} className="flex items-center gap-2 text-sm">
                  {req.met ? (
                    <Check className="h-4 w-4 text-green-500 shrink-0" />
                  ) : (
                    <X className="h-4 w-4 text-muted-foreground shrink-0" />
                  )}
                  <span className={req.met ? "text-green-600" : "text-muted-foreground"}>
                    {req.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 mt-4 border-t">
              <p className="text-xs text-muted-foreground">
                <strong>Tip:</strong> Use a unique password that you don't use elsewhere.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
