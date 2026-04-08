import { Education, Experience, Hobby, Language, PersonalDetails, Skill } from '@/type';

export const personalDetailsPreset: PersonalDetails = {
    fullName: 'Oscar DAGA',
    email: 'oscar.daga@example.com',
    phone: '+48 123 456 789',
    address: 'Warsaw, Poland',
    photoUrl: '/profile.jpg',
    postSeeking: 'Cloud Engineer',
    description: 'Experienced Cloud Engineer with a strong background in designing and deploying scalable cloud infrastructure. Specializing in AWS, Azure, and Kubernetes. Passionate about DevOps practices, automation, and helping teams build robust, secure, and efficient cloud solutions.'
    
};

export const experiencesPreset: Experience[] = [
    {
        id: 'uuid-1',
        jobTitle: 'Senior Cloud Engineer',
        companyName: 'Tech Solutions',
        startDate: '2022-01-01',
        endDate: '2024-12-31',
        description: 'Design and deploy cloud infrastructure on AWS and Azure. Led migration of on-premises applications to cloud. Implemented CI/CD pipelines using Jenkins and GitHub Actions.'
    },
    {
        id: 'uuid-2',
        jobTitle: 'DevOps Engineer',
        companyName: 'Innovatech',
        startDate: '2020-06-01',
        endDate: '2022-01-01',
        description: 'Managed Kubernetes clusters, containerized applications with Docker. Implemented monitoring and logging solutions using Prometheus and ELK stack.'
    }
];

export const educationsPreset: Education[] = [
    {
        id: 'uuid-3',
        degree: 'Master in Computer Science',
        school: 'University of Warsaw',
        startDate: '2018-09-01',
        endDate: '2020-06-01',
        description: 'Specialization in Cloud Computing and Distributed Systems.'
    }
];

export const skillsPreset: Skill[] = [
    { id: 'uuid-4', name: 'AWS' },
    { id: 'uuid-5', name: 'Azure' },
    { id: 'uuid-6', name: 'Kubernetes' },
    { id: 'uuid-7', name: 'Docker' },
    { id: 'uuid-8', name: 'Terraform' },
    { id: 'uuid-9', name: 'CI/CD Pipelines' }
];

export const languagesPreset: Language[] = [
    { id: 'uuid-6', language: 'English', proficiency: 'Avancé' },
    { id: 'uuid-7', language: 'Polish', proficiency: 'Avancé' },
    { id: 'uuid-8', language: 'French', proficiency: 'Intermédiaire' }
];

export const hobbiesPreset: Hobby[] = [
    { id: 'uuid-9', name: 'Cloud Architecture Design' },
    { id: 'uuid-10', name: 'Open Source Contribution' },
    { id: 'uuid-11', name: 'Travel' }
];

// New section presets
export const certificatesPreset = [
    {
        name: 'AWS Solutions Architect Associate',
        issuer: 'Amazon Web Services',
        date: '2023-06-15',
        credentialId: 'AWS-SAA-12345'
    },
    {
        name: 'Certified Kubernetes Administrator',
        issuer: 'Linux Foundation',
        date: '2022-12-10'
    }
];

export const awardsPreset = [
    {
        title: 'Best DevOps Solution',
        organization: 'Tech Innovators Summit',
        date: '2023-09-20',
        description: 'Recognized for innovative CI/CD pipeline architecture'
    }
];

export const coursesPreset = [
    {
        name: 'Advanced Kubernetes Administration',
        provider: 'Linux Academy',
        date: '2023-05-30',
        certificateIssued: true
    }
];

export const organizationsPreset = [
    'Cloud Native Computing Foundation',
    'DevOps Engineers Community'
];

export const publicationsPreset = [
    {
        title: 'Scaling Microservices with Kubernetes',
        publisher: 'TechBlog Magazine',
        date: '2023-03-15',
        url: 'https://example.com/publication'
    }
];

export const referencesPreset = [
    {
        name: 'John Smith',
        position: 'CTO',
        company: 'Tech Solutions',
        email: 'john@techsolutions.com',
        phone: '+1 (555) 123-4567'
    }
];

export const interestsPreset = [
    'Cloud Architecture',
    'DevOps Automation',
    'Kubernetes',
    'Open Source'
];

export const declarationPreset = 'I hereby declare that the information provided in this resume is true and accurate to the best of my knowledge.';

export const linksPreset = [
    {
        label: 'LinkedIn',
        url: 'https://linkedin.com/in/oscardaga',
        icon: '🔗'
    },
    {
        label: 'GitHub',
        url: 'https://github.com/oscardaga',
        icon: '🐙'
    },
    {
        label: 'Credly',
        url: 'https://credly.com/users/oscardaga',
        icon: '🏅'
    }
];
