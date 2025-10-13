import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { TypeSkillBasicDto } from "../../types/TypeSkill";
import {
  createTypeSkill,
  deleteTypeSkill,
  getAllTypeSkills,
  updateTypeSkill,
} from "../../services/typeSkillService";
import { confirmToast } from "../layout/confirmToast";
import { toast } from "react-toastify";
import { set } from "react-hook-form";

export function TypeSkillTable() {
  const [skills, setSkills] = useState<TypeSkillBasicDto[]>([]);
  const [popupMode, setPopupMode] = useState<"create" | "update">("update");
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<TypeSkillBasicDto | null>(
    null
  );
  const [formData, setFormData] = useState({
    typeName: "",
    duration: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openEditPopup = (skill: TypeSkillBasicDto) => {
    setSelectedSkill(skill);
    setFormData({
      typeName: skill.typeName,
      duration: skill.duration,
    });
    setShowEditPopup(true);
    setPopupMode("update");
  };

  const openCreatePopup = () => {
    setPopupMode("create");
    setSelectedSkill(null);
    setFormData({
      typeName: "",
      duration: 0,
    });
    setShowEditPopup(true);
  };

  const closeEditPopup = () => {
    setSelectedSkill(null);
    setShowEditPopup(false);
    setFormData({
      typeName: "",
      duration: 0,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const updateData = {
        typeName: formData.typeName,
        duration: formData.duration,
      };

      if (popupMode === "create") {
        await createTypeSkill(updateData);
        toast.success("Skill created successfully!");
      } else {
        if (!selectedSkill) return;
        await updateTypeSkill(selectedSkill.id, updateData);
        toast.success("Skill updated successfully!");
      }

      await loadSkills();
      closeEditPopup();
    } catch (err) {
      console.error(`Error ${popupMode}ing skill:`, err);
      toast.error(`Failed to ${popupMode} skill. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };

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
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>Type Skills</h5>
        <button
          type="button"
          className="btn btn-primary"
          onClick={openCreatePopup}
        >
          <i className="isax isax-add-circle me-2"></i>
          Add New Skill
        </button>
      </div>

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
                    {/* <Link to={`edit-typeskill/${skill.id}`} className="d-inline-flex fs-14 action-icon">
                    <i className="isax isax-edit"></i>
                  </Link> */}
                    <a
                      type="button"
                      className="d-inline-flex fs-14 action-icon btn p-0"
                      onClick={(e) => {
                        e.preventDefault();
                        openEditPopup(skill);
                      }}
                    >
                      <i className="isax isax-edit"></i>
                    </a>
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

        {/* Edit Popup Modal */}
        {showEditPopup && (
          <div
            className="modal fade show"
            style={{ display: "block" }}
            tabIndex={-1}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {popupMode === "create"
                      ? "Create New Skill"
                      : `Edit Skill`}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={closeEditPopup}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="typeName" className="form-label">
                        Skill Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="typeName"
                        name="typeName"
                        value={formData.typeName}
                        onChange={handleInputChange}
                        placeholder="Enter skill name"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="duration" className="form-label">
                        Duration (minutes)
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="duration"
                        name="duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                        placeholder="Enter duration in minutes"
                        min="1"
                        required
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeEditPopup}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-warning"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? `${popupMode === "create" ? "Creating" : "Updating"}...`
                      : `${popupMode === "create" ? "Create" : "Update"} Skill`}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Backdrop */}
        {showEditPopup && (
          <div
            className="modal-backdrop fade show"
            onClick={closeEditPopup}
          ></div>
        )}
      </div>
    </div>
  );
}
