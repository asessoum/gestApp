package fr.gest.com.application.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link fr.gest.com.application.domain.ArticleCompose} entity.
 */
public class ArticleComposeDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(max = 250)
    private String techID;

    @NotNull
    private Integer remoteID;

    private Double nombre;


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

    public Double getNombre() {
        return nombre;
    }

    public void setNombre(Double nombre) {
        this.nombre = nombre;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ArticleComposeDTO articleComposeDTO = (ArticleComposeDTO) o;
        if (articleComposeDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), articleComposeDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ArticleComposeDTO{" +
            "id=" + getId() +
            ", techID='" + getTechID() + "'" +
            ", remoteID=" + getRemoteID() +
            ", nombre=" + getNombre() +
            "}";
    }
}
