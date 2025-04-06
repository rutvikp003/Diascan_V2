import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Page | Diascan",
  description: "This is Contact Page for Diascan",
  // other metadata
};

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Contact Page"
        description="We’d love to hear from you! Whether you have questions, feedback, or need assistance, feel free to reach out to us."
      />

      <Contact />
      
    </>
  );
};

export default ContactPage;
