package fr.gest.com.application.service.dto;
import java.time.Instant;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import fr.gest.com.application.domain.enumeration.Genre;

/**
 * A DTO for the {@link fr.gest.com.application.domain.Employe} entity.
 */
public class EmployeDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(max = 250)
    private String techID;

    @NotNull
    private Integer remoteID;

    @NotNull
    private Genre genre;

    @NotNull
    @Size(max = 20)
    private String numCarteUti;

    private Instant dateCarteUti;

    @Size(max = 200)
    private String photoID;

    @Size(max = 500)
    private String description;

    private Boolean estActif;

    private Instant creeLe;

    private String creePar;

    private Instant modifLe;

    private String modifPar;


    private Long utilisateurId;

    private Long responsableId;

    private Set<LangueDTO> langues = new HashSet<>();

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

    public Genre getGenre() {
        return genre;
    }

    public void setGenre(Genre genre) {
        this.genre = genre;
    }

    public String getNumCarteUti() {
        return numCarteUti;
    }

    public void setNumCarteUti(String numCarteUti) {
        this.numCarteUti = numCarteUti;
    }

    public Instant getDateCarteUti() {
        return dateCarteUti;
    }

    public void setDateCarteUti(Instant dateCarteUti) {
        this.dateCarteUti = dateCarteUti;
    }

    public String getPhotoID() {
        return photoID;
    }

    public void setPhotoID(String photoID) {
        this.photoID = photoID;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean isEstActif() {
        return estActif;
    }

    public void setEstActif(Boolean estActif) {
        this.estActif = estActif;
    }

    public Instant getCreeLe() {
        return creeLe;
    }

    public void setCreeLe(Instant creeLe) {
        this.creeLe = creeLe;
    }

    public String getCreePar() {
        return creePar;
    }

    public void setCreePar(String creePar) {
        this.creePar = creePar;
    }

    public Instant getModifLe() {
        return modifLe;
    }

    public void setModifLe(Instant modifLe) {
        this.modifLe = modifLe;
    }

    public String getModifPar() {
        return modifPar;
    }

    public void setModifPar(String modifPar) {
        this.modifPar = modifPar;
    }

    public Long getUtilisateurId() {
        return utilisateurId;
    }

    public void setUtilisateurId(Long utilisateurId) {
        this.utilisateurId = utilisateurId;
    }

    public Long getResponsableId() {
        return responsableId;
    }

    public void setResponsableId(Long partenaireId) {
        this.responsableId = partenaireId;
    }

    public Set<LangueDTO> getLangues() {
        return langues;
    }

    public void setLangues(Set<LangueDTO> langues) {
        this.langues = langues;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        EmployeDTO employeDTO = (EmployeDTO) o;
        if (employeDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), employeDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EmployeDTO{" +
            "id=" + getId() +
            ", techID='" + getTechID() + "'" +
            ", remoteID=" + getRemoteID() +
            ", genre='" + getGenre() + "'" +
            ", numCarteUti='" + getNumCarteUti() + "'" +
            ", dateCarteUti='" + getDateCarteUti() + "'" +
            ", photoID='" + getPhotoID() + "'" +
            ", description='" + getDescription() + "'" +
            ", estActif='" + isEstActif() + "'" +
            ", creeLe='" + getCreeLe() + "'" +
            ", creePar='" + getCreePar() + "'" +
            ", modifLe='" + getModifLe() + "'" +
            ", modifPar='" + getModifPar() + "'" +
            ", utilisateur=" + getUtilisateurId() +
            ", responsable=" + getResponsableId() +
            "}";
    }
}
