import { BriefcaseIcon, CheckmarkLogoIcon, ClockIcon, GroupIcon, ShieldIcon, StarIcon, VerifiedIcon } from "../../components/icons"
import React, { useEffect, useState } from "react";
import UserDashboardInformation from "../../components/Volunteer/userDashBoardInfo";
import Dashboard from "../../components/Volunteer/dashboard";

import type { MetricProps, OrganizationNavTypes, OrganizationQuickActions, ProjectProps, VolunteerDashboardProps } from "../../interface/interfaces";
import { ProjectHub } from "../../components/Volunteer/projectHub";
import { DashboardHeader } from "../../components/dashboardHeader";
import { useAuth } from "../../components/hooks/useAuth";

export const DashboardPage = () => {

    const [active, setActive] = useState<OrganizationNavTypes>("Dashboard");
    const [volunteerDashboard, setVolunteerDashboard] = useState<VolunteerDashboardProps>({
        firstname: "",
        projectApplication: []
    });
    const [projects, setProjects] = useState<ProjectProps[]>([])
    const [metrics, setMetrics] = useState<MetricProps[]>([
        {
            title: "Active Projects",
            context: "+12 hours this month",
            icon: <ClockIcon color="#34A853" />,
            value: "5",
            color: "#34A853"
        },
        {
            title: "Total Volunteers",
            context: "+2 this month",
            icon: <GroupIcon color="#1A73E8" />,
            value: "84",
            color: "#1A73E8"
        },
        {
            title: "Average Rating",
            context: "0.0 rating from organizations",
            icon: <StarIcon color="#FBBC05" fill="none" />,
            value: "0",
            color: "#FBBC05"
        },
        {
            title: "Completed Projects",
            context: "8 completed this month",
            icon: <VerifiedIcon color="#B86705" />,
            value: "4",
            color: "#B86705"
        }
    ])


    const buttons = new Map<string, string>()
    buttons.set("Dashboard", "Dashboard")
    buttons.set("Project Management", "Project Management")
    buttons.set("Applications", "Applications")
    buttons.set("Analytics", "Analytics")


    // Makes requests with automatic refresh logic when access token expires
    // const authFetch = useAuth()


    // const projects = rawProjects as ProjectProps[]
    const activateNavButton = (event: React.MouseEvent<HTMLButtonElement>) => {
        let selectButtonValue = buttons.get(event.currentTarget.textContent);
        setActive(selectButtonValue ? selectButtonValue as OrganizationNavTypes : "Dashboard")
    }



    const fetchProjects = async (): Promise<ProjectProps[]> => {
        try {

            const response = await fetch("/data/projects.json", {
                headers: {
                    "Content-Type": "application/json",
                    "cache-control": "no-cache"
                }
            })

            if (!response.ok) {
                throw new Error("Failed to fetch projects")
            }

            const data = await response.json()
            return data as ProjectProps[]
        } catch (error) {
            console.error("Error loading data")
            return []
        }
    }


    const quickAction = (action: OrganizationQuickActions) => {
        switch (action) {
            case "Create New Project":
                setActive(action as OrganizationNavTypes)
                break;

        }
    }



    useEffect(() => {
        (async () => {
            const data = await fetchProjects()
            setProjects(data)
        })()
    }, [])

    return <>
        <main className="">
            <DashboardHeader isOrganization={true} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-15">
                <UserDashboardInformation activeButton={active} buttons={[...buttons.keys()]} onClick={activateNavButton} username={"Abuja Health Organization"} />
                {active == "Dashboard" && projects && <Dashboard projects={projects} metrics={metrics} orgTriggerAction={quickAction} />}
                {active == "Project Management" && <ProjectHub projects={projects} isOrganization={true}/>}
            </div>
        </main>
    </>
}