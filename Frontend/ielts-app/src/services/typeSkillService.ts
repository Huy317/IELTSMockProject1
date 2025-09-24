import type { CreateTypeSkillDto, TypeSkillBasicDto } from "../types/TypeSkill";
import { client } from "./authService";

export async function getAllTypeSkills(): Promise<TypeSkillBasicDto[]> {
    const res = await client.get<TypeSkillBasicDto[]>(`/TypeSkill`);
    return res.data;
}

export async function deleteTypeSkill(id: string | number): Promise<void> {
    await client.delete(`/TypeSkill/${id}`);
}

export async function createTypeSkill(dto : CreateTypeSkillDto) : Promise<TypeSkillBasicDto> {
    const res = await client.post<TypeSkillBasicDto>(`/TypeSkill`, dto);
    return res.data;
}

export async function updateTypeSkill(id: string | number, dto: CreateTypeSkillDto) : Promise<TypeSkillBasicDto> {
    const res = await client.put<TypeSkillBasicDto>(`/TypeSkill/${id}`, dto);
    return res.data;
}