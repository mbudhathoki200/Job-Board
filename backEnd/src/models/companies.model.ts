import { Icompany } from "../interfaces/companies.interface";
import { BaseModel } from "./base.model";

export class CompanyModel extends BaseModel {
  static async createCompany(
    company: Icompany,
    userId: string,
    logoUrl: string
  ) {
    const companyToCreate = {
      name: company.name,
      description: company.description,
      logoUrl: logoUrl,
      website: company.website,
      userId: userId,
    };

    const [createdCompany] = await this.queryBuilder()
      .table("company")
      .insert(companyToCreate)
      .returning("*");

    return createdCompany;
  }
  //get company by id
  static getCompanyById(userId: string) {
    const query = this.queryBuilder()
      .select("id", "name", "description", "logoUrl", "website", "userId")
      .table("company")
      .where({ id: userId });

    return query;
  }

  static getCompanies(userId: string) {
    const data = this.queryBuilder()
      .select("id", "name", "description", "logoUrl", "website", "userId")
      .table("company")
      .where({ userId });

    return data;
  }

  static getAllCompanies() {
    const data = this.queryBuilder()
      .select("id", "name", "description", "logoUrl", "website", "userId")
      .table("company")
      .limit(4);
    return data;
  }
}
