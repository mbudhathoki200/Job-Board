import { Icompany } from "../interfaces/companies.interface";
import { BaseModel } from "./base.model";

export class CompanyModel extends BaseModel {
  static async createCompany(company: Icompany, userId: string) {
    const companyToCreate = {
      name: company.name,
      description: company.description,
      logoUrl: company.logoUrl,
      website: company.website,
      userId: userId,
    };

    await this.queryBuilder().table("company").insert(companyToCreate);

    return companyToCreate;
  }
  //get company by id
  static getCompanyById(userId: string) {
    const query = this.queryBuilder()
      .select("id", "name", "description", "logoUrl", "website", "userId")
      .table("company")
      .where({ id: userId });

    return query;
  }
}