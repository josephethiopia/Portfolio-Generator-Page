import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Personal({ handlePersonalInfo, formData }: any) {
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
            value={formData.personal_info.first_name}
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
            value={formData.personal_info.last_name}
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
            value={formData.personal_info.email}
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
            value={formData.personal_info.phone}
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
            value={formData.personal_info.occupation}
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
            value={formData.personal_info.location}
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="additional_information">Additional Information</Label>
          <Textarea
            id="additional_information"
            name="additional_information"
            onChange={(e) => handlePersonalInfo(e, "additional_information")}
            placeholder="Enter any additional you think is important for your prefered template."
            value={formData.personal_info.additional_information}
            className="min-h-[120px]"
          />
        </div>
      </div>
    </div>
  );
}
