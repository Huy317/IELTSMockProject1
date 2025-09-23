import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { TypeSkillBasicDto } from "../../types/TypeSkill";
import {
  deleteTypeSkill,
  getAllTypeSkills,
} from "../../services/typeSkillService";
import { confirmToast } from "../layout/confirmToast";
import { toast } from "react-toastify";

export function TypeSkillTable() {
  const [skills, setSkills] = useState<TypeSkillBasicDto[]>([]);

  useEffect(() => {
    loadSkills();
  }, []);

  async function loadSkills() {
    const data = await getAllTypeSkills();
    setSkills(data);
  }

  async function handleDelete(id: number) {
    confirmToast(
      "Are you sure you want to delete this skill?",
      async () => {
        try {
          await deleteTypeSkill(id);
          await loadSkills();
          toast.success("Skill deleted successfully!");
        } catch (err) {
          console.error("Delete failed", err);
          toast.error("Failed to delete skill. Please try again.");
        }
      },
      () => {
        // Optional cancel callback
        console.log("Delete cancelled");
      }
    );
  }

  return (
    <div className="table-responsive custom-table">
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>ID</th>
            <th>Skill Name</th>
            <th>Duration</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {skills.map((skill) => (
            <tr key={skill.id}>
              <td>
                <Link to={`#`} className="text-primary">
                  #{skill.id}
                </Link>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <Link to={`#`}>
                    <p className="fs-14">{skill.typeName}</p>
                  </Link>
                </div>
              </td>
              <td>{skill.duration}</td>
              <td>
                <div className="d-flex align-items-center">
                  <Link to={`edit-typeskill/${skill.id}`} className="d-inline-flex fs-14 action-icon">
                    <i className="isax isax-edit"></i>
                  </Link>
                  <Link
                    onClick={() => handleDelete(skill.id)}
                    to="#"
                    className="d-inline-flex fs-14 action-icon"
                  >
                    <i className="isax isax-trash text-danger"></i>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
