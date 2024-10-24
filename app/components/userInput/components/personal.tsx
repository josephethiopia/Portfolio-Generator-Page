import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Personal({ handlePersonalInfo }: any) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Personal Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="first_name">First Name</Label>
          <Input
            type="text"
            id="first_name"
            name="first_name"
            onChange={(e) => handlePersonalInfo(e, "first_name")}
            placeholder="Enter your first name"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="last_name">Last Name</Label>
          <Input
            type="text"
            id="last_name"
            name="last_name"
            onChange={(e) => handlePersonalInfo(e, "last_name")}
            placeholder="Enter your last name"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            onChange={(e) => handlePersonalInfo(e, "email")}
            placeholder="Enter your email address"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            type="tel"
            id="phone"
            name="phone"
            onChange={(e) => handlePersonalInfo(e, "phone")}
            placeholder="Enter your phone number"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="occupation">Occupation</Label>
          <Input
            type="text"
            id="occupation"
            name="occupation"
            onChange={(e) => handlePersonalInfo(e, "occupation")}
            placeholder="Enter your occupation"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            type="text"
            id="location"
            name="location"
            onChange={(e) => handlePersonalInfo(e, "location")}
            placeholder="Enter your location"
          />
        </div>
      </div>
    </div>
  );
}
