import { useState, useEffect } from "react";
import ProjectCard from "../ProjectCard";
import ConfirmDialog from "../ConfirmDialog";
import ProjectDetailsModal from "../ProjectModalDetails";
import type { ProjectProps } from "../../interface/interfaces";

export default function MyVolunteering() {
  const [projects, setProjects] = useState<ProjectProps[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedJob, setSelectedJob] = useState<ProjectProps | null>(null);

  // Simulate backend fetch
  useEffect(() => {
    async function fetchProjects() {
      // const data: ProjectProps[] = [
      //   {
      //     id: "1",
      //     title: "Frontend Developer",
      //     organization: {
      //       name: "TechCorp Ltd",
      //       status: "VERIFIED",
      //       address: "123 Business Rd, Lagos, Nigeria",
      //       numOfActiveProjects: 5,
      //       category: "Technology, Education"
      //     },
      //     location: {
      //       lga: "Ikoyi",
      //       state: "Lagos"
      //     },
      //     startDate: "2025-11-10",
      //     status: "PENDING",
      //     description:
      //       "Responsible for building and maintaining user interfaces using React. Collaborate with backend developers and designers to ensure seamless functionality.",
      //     category: "",
      //   },
      //   {
      //     id: 2,
      //     title: "Graphic Designer",
      //     company: "Designify Studios",
      //     location: "Abuja, Nigeria",
      //     dateStarted: "2025-10-22",
      //     status: "completed",
      //     rating: "⭐⭐⭐⭐",
      //     description:
      //       "Design marketing materials, social media graphics, and branding assets for client projects.",
      //     verified: true,
      //     userApplied: true,
      //     companyAddress: "123 Business Rd, Lagos, Nigeria",
      //     companyActiveProjects: 5,
      //     companyIndustries: ["Technology", "Education"],
      //   },
      //   {
      //     id: 3,
      //     title: "UI/UX Designer",
      //     company: "SoftBridge",
      //     location: "Kano, Nigeria",
      //     dateStarted: "2025-11-05",
      //     status: "ongoing",
      //     description:
      //       "Create wireframes, prototypes, and collaborate with developers to bring designs to life.",
      //     verified: true,
      //     userApplied: true,
      //     companyAddress: "123 Business Rd, Lagos, Nigeria",
      //     companyActiveProjects: 5,
      //     companyIndustries: ["Technology", "Education"],
      //   },
      // ];
      
      let response = await fetch("/data/projects.json")
      try{
        if(response.ok){
          setProjects(await response.json() as ProjectProps[])
        }
      }catch(err){
        console.error(err)
      }
      
    }

    fetchProjects();
  }, []);

  const handleCancelClick = (project: ProjectProps) => {
    setSelectedJob(project);
    setShowDialog(true);
  };

  const confirmCancel = () => {
    if (!selectedJob) return;
    setProjects((prev) => prev.filter((j) => j.id !== selectedJob.id));
    setShowDialog(false);
    setSelectedJob(null);
  };

  const handleViewDetailsClick = (project: ProjectProps) => {
    setSelectedJob(project);
    setShowDetails(true);
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="grid md:grid-cols-2  gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onCancelClick={handleCancelClick}
            onViewDetailsClick={handleViewDetailsClick}
          />
        ))}
      </div>

      {/* Modals */}
      <ConfirmDialog
        visible={showDialog}
        onConfirm={confirmCancel}
        onClose={() => setShowDialog(false)}
      />
      <ProjectDetailsModal
        visible={showDetails}
        project={selectedJob}
        onClose={() => setShowDetails(false)}
      />
    </div>
  );
}
