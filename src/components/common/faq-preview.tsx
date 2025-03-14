import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const FAQPreview = () => {
  return (
    <div className="mt-36 flex flex-col items-center justify-center max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center dark:text-white">
        Frequently Asked Questions
      </h1>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-4">
          <AccordionTrigger>
            How does the AI Resume Builder work?
          </AccordionTrigger>
          <AccordionContent>
            Our AI Resume Builder analyzes your input, experience, and skills to
            generate a professional and optimized resume tailored to your
            industry.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>
            Can I customize my AI-generated resume?
          </AccordionTrigger>
          <AccordionContent>
            Yes, you can edit and customize every section of your resume to
            match your personal preferences and specific job requirements.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6">
          <AccordionTrigger>
            Does the AI Resume Builder support different resume templates?
          </AccordionTrigger>
          <AccordionContent>
            Yes, we provide multiple professionally designed templates that you
            can choose from, ensuring your resume stands out.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-7">
          <AccordionTrigger>
            Is my data safe with the AI Resume Builder?
          </AccordionTrigger>
          <AccordionContent>
            Absolutely! We use top-tier encryption and security measures to
            protect your data and ensure privacy.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-8">
          <AccordionTrigger>
            Can the AI optimize my resume for ATS (Applicant Tracking Systems)?
          </AccordionTrigger>
          <AccordionContent>
            Yes, our AI ensures your resume is ATS-friendly by optimizing
            formatting, keywords, and structure to improve your chances of
            passing automated screenings.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FAQPreview;
