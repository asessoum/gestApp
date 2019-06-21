package fr.gest.com.application.service.dto;
import java.time.Instant;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link fr.gest.com.application.domain.Commande} entity.
 */
public class CommandeDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(max = 250)
    private String techID;

    @NotNull
    private Integer remoteID;

    @NotNull
    private Double quantiteTotal;

    @NotNull
    private Double prixTotalCommande;

    @NotNull
    private Double prixHT;

    @NotNull
    private Double tva;

    private Boolean validSup;

    private Boolean validRes;

    private Boolean estActif;

    private Instant creeLe;

    private String creePar;

    private Instant modifLe;

    private String modifPar;


    private Long factureId;

    private Long clientId;

    private Long commercialId;

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

    public Double getQuantiteTotal() {
        return quantiteTotal;
    }

    public void setQuantiteTotal(Double quantiteTotal) {
        this.quantiteTotal = quantiteTotal;
    }

    public Double getPrixTotalCommande() {
        return prixTotalCommande;
    }

    public void setPrixTotalCommande(Double prixTotalCommande) {
        this.prixTotalCommande = prixTotalCommande;
    }

    public Double getPrixHT() {
        return prixHT;
    }

    public void setPrixHT(Double prixHT) {
        this.prixHT = prixHT;
    }

    public Double getTva() {
        return tva;
    }

    public void setTva(Double tva) {
        this.tva = tva;
    }

    public Boolean isValidSup() {
        return validSup;
    }

    public void setValidSup(Boolean validSup) {
        this.validSup = validSup;
    }

    public Boolean isValidRes() {
        return validRes;
    }

    public void setValidRes(Boolean validRes) {
        this.validRes = validRes;
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

    public Long getFactureId() {
        return factureId;
    }

    public void setFactureId(Long factureId) {
        this.factureId = factureId;
    }

    public Long getClientId() {
        return clientId;
    }

    public void setClientId(Long clientId) {
        this.clientId = clientId;
    }

    public Long getCommercialId() {
        return commercialId;
    }

    public void setCommercialId(Long employeId) {
        this.commercialId = employeId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CommandeDTO commandeDTO = (CommandeDTO) o;
        if (commandeDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), commandeDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CommandeDTO{" +
            "id=" + getId() +
            ", techID='" + getTechID() + "'" +
            ", remoteID=" + getRemoteID() +
            ", quantiteTotal=" + getQuantiteTotal() +
            ", prixTotalCommande=" + getPrixTotalCommande() +
            ", prixHT=" + getPrixHT() +
            ", tva=" + getTva() +
            ", validSup='" + isValidSup() + "'" +
            ", validRes='" + isValidRes() + "'" +
            ", estActif='" + isEstActif() + "'" +
            ", creeLe='" + getCreeLe() + "'" +
            ", creePar='" + getCreePar() + "'" +
            ", modifLe='" + getModifLe() + "'" +
            ", modifPar='" + getModifPar() + "'" +
            ", facture=" + getFactureId() +
            ", client=" + getClientId() +
            ", commercial=" + getCommercialId() +
            "}";
    }
}
