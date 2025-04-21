/* eslint-disable react/no-unescaped-entities */
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { fetchUnitById } from "../../../../../utils/fetchers";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Zod schema for tenant validation
const tenantSchema = z.object({
  title: z.enum(["Mr", "Ms", "Mrs"], {
    errorMap: () => ({ message: "Title is required." }),
  }),
  firstName: z.string().min(1, { message: "First name is required" }),
  middleName: z.string().optional(),
  lastName: z.string().min(1, { message: "Last name is required" }),
  nationality: z.string(),
  idType: z.enum(["National ID", "Passport", "Driver's License"], {
    errorMap: () => ({ message: "ID type is required." }),
  }),
  idNumber: z.string(),
  gender: z.enum(["Male", "Female"], {
    errorMap: () => ({ message: "Gender is required." }),
  }),
  dateOfBirth: z.string().min(1, { message: "Date of birth is required" }),
  mobileNumber: z.string().min(10, { message: "Mobile number is required" }),
  emailAddress: z
    .string()
    .email({ message: "Enter a valid email" })
    .min(1, { message: "Email address is required" }),
});

export default function Home() {
  const params = useParams();
  const { id } = params;
  const [unit, setUnit] = useState(null);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(tenantSchema),
    defaultValues: {
      title: "",
      firstName: "",
      middleName: "",
      lastName: "",
      nationality: "",
      idType: "",
      idNumber: "",
      gender: "",
      dateOfBirth: "",
      mobileNumber: "",
      emailAddress: "",
    },
  });

  useEffect(() => {
    const fetchUnit = async () => {
      try {
        const companyId = sessionStorage.getItem("companyId");
        const unitData = await fetchUnitById(companyId, id);
        setUnit(unitData);
      } catch (error) {
        console.error("Error fetching unit data:", error.message);
      }
    };

    if (id) {
      fetchUnit();
    }
  }, [id]);

  const onSubmit = async (data) => {
    try {
      const authToken = sessionStorage.getItem("token");
      const userId = sessionStorage.getItem("companyId");
      const companyId = sessionStorage.getItem("companyId");
      const tenantData = [data]; 
      if (!authToken) {
        console.error("Auth token is missing");
        return;
      }
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(tenantData),
      };
      const response = await fetch(`http://localhost:8000/api/v1/create-tenant/${userId}/${companyId}/${id}`, requestOptions); // Replace with your API endpoint
      if (response.ok) {
        console.log("Tenant data submitted successfully");
        form.reset();
      } else {
        console.error("Error submitting tenant data:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting tenant data:", error.message);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Unit Overview</h1>
      {unit ? (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4 mb-2">
          <div className="bg-white shadow-lg py-3 px-2 rounded-sm">
            <p>Name</p>
            <p className="mt-1 font-bold">{unit.unitName}</p>
          </div>
          <div className="bg-white shadow-lg py-3 px-2 rounded-sm">
            <p>Type</p>
            <p className="mt-1 font-bold">{unit.type}</p>
          </div>
          <div className="bg-white shadow-lg py-3 px-2 rounded-sm">
            <p>Price</p>
            <p className="mt-1 font-bold">{unit.price}</p>
          </div>
          <div className="bg-white shadow-lg py-3 px-2 rounded-sm">
            <p>State</p>
            <p className="mt-1 font-bold">Empty</p>
          </div>
        </div>
      ) : (
        <p>Loading Unit details...</p>
      )}
      <hr />

      {/* Add Tenant Form */}
      <Form {...form}>
        <h1 className="text-2xl font-bold mt-6 mb-4">Add Tenant</h1>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid px-3 grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 bg-white rounded shadow-lg py-3"
        >
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select title" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Mr">Mr</SelectItem>
                    <SelectItem value="Ms">Ms</SelectItem>
                    <SelectItem value="Mrs">Mrs</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* First Name */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter first name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Middle Name */}
          <FormField
            control={form.control}
            name="middleName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Middle Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter middle name (optional)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Last Name */}
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Nationality */}
          <FormField
            control={form.control}
            name="nationality"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nationality</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter nationality" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ID Type */}
          <FormField
            control={form.control}
            name="idType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ID Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select ID type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="National ID">National ID</SelectItem>
                    <SelectItem value="Passport">Passport</SelectItem>
                    <SelectItem value="Driver's License">Driver's License</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ID Number */}
          <FormField
            control={form.control}
            name="idNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ID Number</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter ID number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Gender */}
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date of Birth */}
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Mobile Number */}
          <FormField
            control={form.control}
            name="mobileNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile Number</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter mobile number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email Address */}
          <FormField
            control={form.control}
            name="emailAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter email address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit" className="col-span-2">
            Add Tenant
          </Button>
        </form>
      </Form>
    </div>
  );
}
