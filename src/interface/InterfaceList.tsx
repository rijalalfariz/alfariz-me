import { JSX } from 'react';
import { IconName } from 'tech-stack-icons';

export interface TechStackItem {
  key: string;
  icon?: IconName;
  name: string;
  proficiency: number;
  details?: JSX.Element;
}

export interface TechStackConnection {
  from: (TechStackItem | string);
  to: (TechStackItem | string);
}

export interface Project {
  title: string,
  tagLine?: string,
  description: string,
  longDescription?: string,
  image: string[],
  feature?: string[];
  tech: string[];
  tags?: string[];
  projectLink?: string;
  gitLink?: string;
  isPrivate: boolean;
}

export interface Certificate {
  title?: string;
  src: string;
  certifiedBy?: string;
}
