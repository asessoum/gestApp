package fr.gest.com.application.service.dto;
import java.time.Instant;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link fr.gest.com.application.domain.Partenaire} entity.
 */
public class PartenaireDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(max = 250)
    private String techID;

    @NotNull
    private Integer remoteID;

    @Size(max = 50)
    private String raisonSociale;

    private Double nombreSalaries;

    private Boolean estActif;

    private Instant creeLe;

    private String creePar;

    private Instant modifLe;

    private String modifPar;


    private Long langueId;

    private Long adresseId;

    private Long referencesId;

    private Long categoriesId;

    private Long articlesId;

    private Long reductionsId;

    private Long profilesId;

    private Long habilitationsId;

    private Long fournisseursId;

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

    public String getRaisonSociale() {
        return raisonSociale;
    }

    public void setRaisonSociale(String raisonSociale) {
        this.raisonSociale = raisonSociale;
    }

    public Double getNombreSalaries() {
        return nombreSalaries;
    }

    public void setNombreSalaries(Double nombreSalaries) {
        this.nombreSalaries = nombreSalaries;
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

    public Long getLangueId() {
        return langueId;
    }

    public void setLangueId(Long langueId) {
        this.langueId = langueId;
    }

    public Long getAdresseId() {
        return adresseId;
    }

    public void setAdresseId(Long adresseId) {
        this.adresseId = adresseId;
    }

    public Long getReferencesId() {
        return referencesId;
    }

    public void setReferencesId(Long referenceId) {
        this.referencesId = referenceId;
    }

    public Long getCategoriesId() {
        return categoriesId;
    }

    public void setCategoriesId(Long categorieId) {
        this.categoriesId = categorieId;
    }

    public Long getArticlesId() {
        return articlesId;
    }

    public void setArticlesId(Long articleId) {
        this.articlesId = articleId;
    }

    public Long getReductionsId() {
        return reductionsId;
    }

    public void setReductionsId(Long reductionId) {
        this.reductionsId = reductionId;
    }

    public Long getProfilesId() {
        return profilesId;
    }

    public void setProfilesId(Long profileId) {
        this.profilesId = profileId;
    }

    public Long getHabilitationsId() {
        return habilitationsId;
    }

    public void setHabilitationsId(Long habilitationId) {
        this.habilitationsId = habilitationId;
    }

    public Long getFournisseursId() {
        return fournisseursId;
    }

    public void setFournisseursId(Long fournisseurId) {
        this.fournisseursId = fournisseurId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PartenaireDTO partenaireDTO = (PartenaireDTO) o;
        if (partenaireDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), partenaireDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PartenaireDTO{" +
            "id=" + getId() +
            ", techID='" + getTechID() + "'" +
            ", remoteID=" + getRemoteID() +
            ", raisonSociale='" + getRaisonSociale() + "'" +
            ", nombreSalaries=" + getNombreSalaries() +
            ", estActif='" + isEstActif() + "'" +
            ", creeLe='" + getCreeLe() + "'" +
            ", creePar='" + getCreePar() + "'" +
            ", modifLe='" + getModifLe() + "'" +
            ", modifPar='" + getModifPar() + "'" +
            ", langue=" + getLangueId() +
            ", adresse=" + getAdresseId() +
            ", references=" + getReferencesId() +
            ", categories=" + getCategoriesId() +
            ", articles=" + getArticlesId() +
            ", reductions=" + getReductionsId() +
            ", profiles=" + getProfilesId() +
            ", habilitations=" + getHabilitationsId() +
            ", fournisseurs=" + getFournisseursId() +
            "}";
    }
}
