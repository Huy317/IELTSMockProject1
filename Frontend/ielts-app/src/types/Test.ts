export interface Test {
  id: number;
  testName: string;
  createdBy: number;
  createdAt: string;
  resource: string;
  isActive: string;
}

export interface TestWithAuthorName {
  id: number;
  testName: string;
  createdBy: number;
  createdAt: string;
  resource: string;
  isActive: string;
  instructorName: string;
  typeName: string;
}