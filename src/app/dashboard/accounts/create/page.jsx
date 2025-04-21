"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import Swal from "sweetalert2";
import { createAccount } from "../../../../utils/fetchers";

// Validation schema
const formSchema = z.object({
  accountType: z.enum(["savings", "current"], {
    required_error: "Account Type is required",
  }),
  currency: z
    .string()
    .min(2, { message: "Currency must be at least 2 characters." }),
});

export default function CreateAccountForm() {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountType: "savings",
      currency: "INR",
    },
  });

  async function onSubmit(data) {
    try {
      const userId = sessionStorage.getItem("userId");
      if (!userId) throw new Error("User not authenticated");

      const response = await createAccount({
        ...data,
        userId,
      });

      Swal.fire({
        title: "Success!",
        text: response.message || "Account created successfully!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        form.reset();
        router.push("/dashboard/accounts");
      });
    } catch (error) {
      console.error("Error creating account:", error.message);
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }

  return (
    <Form {...form}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Create New Account</h1>
        <Link
          href="/dashboard/accounts"
          className="text-white bg-[#030712] px-4 py-2 rounded-sm"
        >
          View All Accounts
        </Link>
      </div>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid px-3 grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 bg-white py-5 rounded"
      >
        {/* Account Type Dropdown */}
        <FormField
          control={form.control}
          name="accountType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Type</FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="w-full p-2 border rounded text-sm"
                >
                  <option value="savings">Savings</option>
                  <option value="current">Current</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Currency Input */}
        <FormField
          control={form.control}
          name="currency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Currency</FormLabel>
              <FormControl>
                <Input placeholder="e.g. INR, USD, EUR" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit */}
        <div className="col-span-full mt-4 flex items-center space-x-4">
          <Button type="submit" className="w-full md:w-auto px-4">
            Create Account
          </Button>
          <Link
            href="/dashboard/accounts"
            className="text-white bg-[#030712] w-full md:w-auto px-4 py-2 rounded-sm"
          >
            View Accounts
          </Link>
        </div>
      </form>
    </Form>
  );
}
