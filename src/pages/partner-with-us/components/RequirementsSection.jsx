import React from 'react';
import Icon from '../../../components/AppIcon';

const RequirementsSection = () => {
  const requirements = [
    {
      id: 1,
      category: "Legal Requirements",
      items: [
        "Valid business license and registration",
        "Liability insurance coverage",
        "Health and safety certifications",
        "Tax identification number"
      ]
    },
    {
      id: 2,
      category: "Facility Standards",
      items: [
        "Minimum 500 sq ft of workout space",
        "Well-maintained equipment",
        "Clean and hygienic environment",
        "Adequate ventilation and lighting"
      ]
    },
    {
      id: 3,
      category: "Operational Requirements",
      items: [
        "Minimum 6 months of operation",
        "Qualified and certified trainers",
        "Clear membership terms and pricing",
        "Customer service standards"
      ]
    }
  ];

  return (
    <div className="bg-card rounded-lg p-8 card-elevation-sm">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-3">Partnership Requirements</h2>
        <p className="text-muted-foreground text-lg">Ensure your facility meets these criteria before applying</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {requirements?.map((req) => (
          <div key={req?.id} className="bg-muted/30 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                <Icon name="CheckCircle2" size={18} color="var(--color-primary)" />
              </div>
              {req?.category}
            </h3>
            <ul className="space-y-3">
              {req?.items?.map((item, index) => (
                <li key={index} className="flex items-start text-sm text-muted-foreground">
                  <Icon name="Check" size={16} color="var(--color-success)" className="mr-2 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-lg">
        <div className="flex items-start">
          <Icon name="AlertCircle" size={24} color="var(--color-primary)" className="mr-3 mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-foreground mb-2">Important Note</h4>
            <p className="text-sm text-muted-foreground">
              All partner gyms undergo a verification process including facility inspection and document review. 
              The approval process typically takes 5-7 business days. We reserve the right to decline applications 
              that do not meet our quality standards or partnership criteria.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequirementsSection;