import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";
import DiabetesDetection from "@/components/Services/Diabetesdetection";

export const metadata: Metadata = {
  title: "Service Page | Diascan",
  description: "This is service Page for Diascan",
  // other metadata
};

const Blog = () => {
  return (
    <>
      <Breadcrumb
        pageName="Services"
        description="Our diabetes detection tool helps you assess your risk of diabetes by analyzing key health indicators. 
          Simply click the button below and let our system analyze your data."
      />
      <DiabetesDetection />
      
    </>
  );
};

export default Blog;
