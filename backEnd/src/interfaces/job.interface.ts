export interface IJOB {
  id: string;
  title: string;
  description: string;
  requirements: string;
  location: string;
  salaryMin: string;
  salaryMax: string;
  postDate: string;
  expiryDate: string;
  openings: string;
  experience: string;
  level: string;
  createdBy: string;
  companyId: string;
  categoryId: string;
  type: string;
}

export interface GetJobQuery {
  title?: string;
  page?: number;
  size?: number;
  category?: string;
  location?: string;
  type?: string;
  salary?: string;
}
