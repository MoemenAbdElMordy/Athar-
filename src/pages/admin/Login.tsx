import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2, Lock, Mail, ArrowLeft } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Checkbox } from "../../components/ui/checkbox";
import { useAuth } from "../../components/admin/AuthContext";
import logo from "../../assets/d2a86183f3650ad510e5554066e364f7473a20fa.png";

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Get the redirect path from location state, or default to /admin
  const from = (location.state as any)?.from?.pathname || "/admin";

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const success = await login(data.email, data.password);
      if (success) {
        toast.success("Welcome back, Admin!");
        navigate(from, { replace: true });
      } else {
        toast.error("Invalid admin credentials. Check ADMIN_EMAIL / ADMIN_PASSWORD in backend .env and run seeders.");
      }
    } catch (error) {
      toast.error("An error occurred during sign in.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EAF2FB] flex items-center justify-center p-4 relative">
      <Link 
        to="/" 
        className="absolute top-8 left-8 flex items-center gap-2 text-[#1F3C5B] font-bold hover:underline group hidden md:flex"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        Return to Website
      </Link>

      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-24 h-24 mx-auto mb-6">
            <img src={logo} alt="Athar Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-3xl font-extrabold text-[#1F3C5B]">Admin Portal</h1>
          <p className="text-slate-500 mt-2">Sign in to manage Athar accessibility data</p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-2xl shadow-slate-200/50 border border-white/20">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@athar.com"
                  className="pl-10 h-12 bg-slate-50 border-slate-200 focus:ring-[#1F3C5B] focus:border-[#1F3C5B] rounded-xl"
                  {...register("email", { required: "Email is required" })}
                />
              </div>
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message as string}</p>}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <button type="button" className="text-xs font-semibold text-[#C9A24D] hover:underline">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 h-12 bg-slate-50 border-slate-200 focus:ring-[#1F3C5B] focus:border-[#1F3C5B] rounded-xl"
                  {...register("password", { required: "Password is required" })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message as string}</p>}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="remember" className="border-slate-300 data-[state=checked]:bg-[#1F3C5B]" />
              <label htmlFor="remember" className="text-sm text-slate-600 cursor-pointer">
                Remember me for 30 days
              </label>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-[#1F3C5B] hover:bg-[#1F3C5B]/90 text-white rounded-xl font-bold text-lg shadow-lg shadow-[#1F3C5B]/20 transition-all active:scale-[0.98]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Authenticating...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </div>

        <div className="text-center mt-6">
           <p className="text-slate-500 text-sm">Use <strong>admin@athar.com</strong> / <strong>admin123</strong> to login</p>
        </div>

        <div className="flex flex-col items-center gap-4 mt-8">
          <Link to="/" className="text-slate-500 text-sm hover:text-[#1F3C5B] font-medium md:hidden">
            ← Return to Website
          </Link>
          <p className="text-center text-slate-500 text-sm">
            Protected by Athar Security. Need access? <span className="text-[#C9A24D] font-semibold cursor-pointer hover:underline">Contact System Admin</span>
          </p>
        </div>
      </div>
    </div>
  );
}
