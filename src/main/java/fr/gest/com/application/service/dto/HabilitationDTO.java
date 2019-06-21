package fr.gest.com.application.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link fr.gest.com.application.domain.Habilitation} entity.
 */
public class HabilitationDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(max = 250)
    private String techID;

    @NotNull
    private Integer remoteID;

    @NotNull
    @Size(max = 15)
    private String profile;

    @NotNull
    @Size(max = 50)
    private String ressource;

    @NotNull
    @Size(max = 10)
    private String permission;

    @NotNull
    @Size(max = 2)
    private String acces;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTechID() {
        return techID;
    }

    public void setTechID(String techID) {
        this.techID = techID;
    }

    public Integer getRemoteID() {
        return remoteID;
    }

    public void setRemoteID(Integer remoteID) {
        this.remoteID = remoteID;
    }

    public String getProfile() {
        return profile;
    }

    public void setProfile(String profile) {
        this.profile = profile;
    }

    public String getRessource() {
        return ressource;
    }

    public void setRessource(String ressource) {
        this.ressource = ressource;
    }

    public String getPermission() {
        return permission;
    }

    public void setPermission(String permission) {
        this.permission = permission;
    }

    public String getAcces() {
        return acces;
    }

    public void setAcces(String acces) {
        this.acces = acces;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        HabilitationDTO habilitationDTO = (HabilitationDTO) o;
        if (habilitationDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), habilitationDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "HabilitationDTO{" +
            "id=" + getId() +
            ", techID='" + getTechID() + "'" +
            ", remoteID=" + getRemoteID() +
            ", profile='" + getProfile() + "'" +
            ", ressource='" + getRessource() + "'" +
            ", permission='" + getPermission() + "'" +
            ", acces='" + getAcces() + "'" +
            "}";
    }
}
