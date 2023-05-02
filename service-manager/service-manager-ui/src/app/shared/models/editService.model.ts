export class EditService {
    constructor(
      public id : number,
      public fullName: string,
      public plateNumber: string,
      public carMake: string,
      public carModel: string,
      public description: string,
      public date: string,
      public workStation: number,
      public estimate: number,
      public notes: string
    ) {}
  }
  