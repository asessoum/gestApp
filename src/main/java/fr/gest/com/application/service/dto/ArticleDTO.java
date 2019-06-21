package fr.gest.com.application.service.dto;
import java.time.Instant;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import fr.gest.com.application.domain.enumeration.UniteVente;

/**
 * A DTO for the {@link fr.gest.com.application.domain.Article} entity.
 */
public class ArticleDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(max = 250)
    private String techID;

    @NotNull
    private Integer remoteID;

    @NotNull
    @Size(max = 20)
    private String libelle;

    @Size(max = 200)
    private String description;

    private Double prixDeVente;

    private Double prixDeRevient;

    private Double margeBrute;

    @NotNull
    private Boolean estCompose;

    @NotNull
    private UniteVente uniteVente;

    private Double pourcentageTva;

    private String codeBarre;

    private Boolean estActif;

    private Instant creeLe;

    private String creePar;

    private Instant modifLe;

    private String modifPar;


    private Long categorieId;

    private Long reductionId;

    private Long fournisseurId;

    private Long compositionId;

    private Long stockId;

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

    public String getLibelle() {
        return libelle;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrixDeVente() {
        return prixDeVente;
    }

    public void setPrixDeVente(Double prixDeVente) {
        this.prixDeVente = prixDeVente;
    }

    public Double getPrixDeRevient() {
        return prixDeRevient;
    }

    public void setPrixDeRevient(Double prixDeRevient) {
        this.prixDeRevient = prixDeRevient;
    }

    public Double getMargeBrute() {
        return margeBrute;
    }

    public void setMargeBrute(Double margeBrute) {
        this.margeBrute = margeBrute;
    }

    public Boolean isEstCompose() {
        return estCompose;
    }

    public void setEstCompose(Boolean estCompose) {
        this.estCompose = estCompose;
    }

    public UniteVente getUniteVente() {
        return uniteVente;
    }

    public void setUniteVente(UniteVente uniteVente) {
        this.uniteVente = uniteVente;
    }

    public Double getPourcentageTva() {
        return pourcentageTva;
    }

    public void setPourcentageTva(Double pourcentageTva) {
        this.pourcentageTva = pourcentageTva;
    }

    public String getCodeBarre() {
        return codeBarre;
    }

    public void setCodeBarre(String codeBarre) {
        this.codeBarre = codeBarre;
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

    public Long getCategorieId() {
        return categorieId;
    }

    public void setCategorieId(Long categorieId) {
        this.categorieId = categorieId;
    }

    public Long getReductionId() {
        return reductionId;
    }

    public void setReductionId(Long reductionId) {
        this.reductionId = reductionId;
    }

    public Long getFournisseurId() {
        return fournisseurId;
    }

    public void setFournisseurId(Long fournisseurId) {
        this.fournisseurId = fournisseurId;
    }

    public Long getCompositionId() {
        return compositionId;
    }

    public void setCompositionId(Long articleComposeId) {
        this.compositionId = articleComposeId;
    }

    public Long getStockId() {
        return stockId;
    }

    public void setStockId(Long stockId) {
        this.stockId = stockId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ArticleDTO articleDTO = (ArticleDTO) o;
        if (articleDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), articleDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ArticleDTO{" +
            "id=" + getId() +
            ", techID='" + getTechID() + "'" +
            ", remoteID=" + getRemoteID() +
            ", libelle='" + getLibelle() + "'" +
            ", description='" + getDescription() + "'" +
            ", prixDeVente=" + getPrixDeVente() +
            ", prixDeRevient=" + getPrixDeRevient() +
            ", margeBrute=" + getMargeBrute() +
            ", estCompose='" + isEstCompose() + "'" +
            ", uniteVente='" + getUniteVente() + "'" +
            ", pourcentageTva=" + getPourcentageTva() +
            ", codeBarre='" + getCodeBarre() + "'" +
            ", estActif='" + isEstActif() + "'" +
            ", creeLe='" + getCreeLe() + "'" +
            ", creePar='" + getCreePar() + "'" +
            ", modifLe='" + getModifLe() + "'" +
            ", modifPar='" + getModifPar() + "'" +
            ", categorie=" + getCategorieId() +
            ", reduction=" + getReductionId() +
            ", fournisseur=" + getFournisseurId() +
            ", composition=" + getCompositionId() +
            ", stock=" + getStockId() +
            "}";
    }
}
