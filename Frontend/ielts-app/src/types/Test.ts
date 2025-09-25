// unused? maybe delete after switching it all to TestWithAuthorName
export interface Test {
  id: number;
  testName: string;
  createdBy: number;
  createdAt: string;
  resource: string;
  isActive: string;
}

export interface TestToCreate {
  testName: string;
  createdBy: number;
  createdAt: string;
  resource: string;
  typeId: number;
  isActive: boolean;
}

export interface TestWithAuthorName {
  id: number;
  testName: string;
  createdBy: number;
  createdAt: string;
  resource: string;
  isActive: boolean;
  instructorName: string;
  typeName: string;
  submissionCount: number;
}

export interface TestToUpdate {
  testName : string,
  createdBy : number, // TODO: delete later
  resource : string,
  isActive : boolean
}