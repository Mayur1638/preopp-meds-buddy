
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useSignUpForm } from "./hooks/useSignUpForm";
import { EmergencyContactFields } from "./EmergencyContactFields";
import { FormProvider } from "react-hook-form";

interface SignUpFormProps {
  onToggleForm: () => void;
}

export function SignUpForm({ onToggleForm }: SignUpFormProps) {
  const { form, handleSubmit, dataFetchLoading, dataFetchSuccess } = useSignUpForm();

  return (
    <>
      <FormProvider {...form}>
        <Card className="w-full max-w-md mx-auto shadow-lg animate-slide-in-bottom">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-primary">
              Create an Account
            </CardTitle>
            <CardDescription className="text-center">
              Enter your information to get started
            </CardDescription>
          </CardHeader>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Input placeholder="Health ID *" {...form.register("healthId", { required: true })} disabled={dataFetchLoading} className="focus:border-primary" />
              </div>
              <div className="space-y-2">
                <Input placeholder="Full Name *" {...form.register("name", { required: true })} disabled={dataFetchLoading} className="focus:border-primary" />
              </div>
              <div className="space-y-2">
                <Input type="email" placeholder="Email *" {...form.register("email", { required: true })} disabled={dataFetchLoading} className="focus:border-primary" />
              </div>
              <div className="space-y-2">
                <Input type="password" placeholder="Password *" {...form.register("password", { required: true })} disabled={dataFetchLoading} className="focus:border-primary" />
              </div>
              <div className="space-y-2">
                <Input type="password" placeholder="Confirm Password *" {...form.register("confirmPassword", { required: true })} disabled={dataFetchLoading} className="focus:border-primary" />
              </div>
              <div className="space-y-2">
                <label htmlFor="dob" className="block text-sm">Date of Birth</label>
                <Input id="dob" type="date" {...form.register("dob")} disabled={dataFetchLoading} className="focus:border-primary" />
              </div>
              <div className="flex gap-2">
                <div className="space-y-2 flex-1">
                  <label htmlFor="height" className="block text-sm">Height (cm)</label>
                  <Input id="height" type="number" {...form.register("height", { required: true })} disabled={dataFetchLoading} />
                </div>
                <div className="space-y-2 flex-1">
                  <label htmlFor="weight" className="block text-sm">Weight (kg)</label>
                  <Input id="weight" type="number" {...form.register("weight", { required: true })} disabled={dataFetchLoading} />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="allergies" className="block text-sm">Allergies</label>
                <Input id="allergies" placeholder="Allergies" {...form.register("allergies")} disabled={dataFetchLoading} />
              </div>
              <div className="space-y-2">
                <label htmlFor="gender" className="block text-sm">Gender</label>
                <select id="gender" {...form.register("gender", { required: true })} className="w-full rounded border py-2 text-foreground bg-background" disabled={dataFetchLoading}>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="bloodGroup" className="block text-sm">Blood Group</label>
                <select id="bloodGroup" {...form.register("bloodGroup", { required: true })} className="w-full rounded border py-2 text-foreground bg-background" disabled={dataFetchLoading}>
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
              <EmergencyContactFields register={form.register} errors={form.formState.errors} disabled={dataFetchLoading} />
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={dataFetchLoading}>
                {dataFetchLoading ? "Creating account..." : "Create Account"}
              </Button>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Button
                  variant="link"
                  size="sm"
                  onClick={onToggleForm}
                  disabled={dataFetchLoading}
                  className="text-primary p-0"
                >
                  Sign in
                </Button>
              </div>
            </CardFooter>
          </form>
        </Card>
      </FormProvider>

      <Dialog open={dataFetchLoading}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Fetching Your Medical Data</DialogTitle>
            <DialogDescription>
              Please wait while we fetch your medications and procedures...
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center py-6">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={dataFetchSuccess}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-success">Success!</DialogTitle>
            <DialogDescription>
              Your medical data has been successfully imported.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
