export interface TypeSkillBasicDto {
    id: number;
    typeName: string;
    duration: number;
}

export interface CreateTypeSkillDto {
    typeName: string;
    duration: number;
}