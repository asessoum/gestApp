package fr.gest.com.application.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A Commande.
 */
@Entity
@Table(name = "commande")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Commande implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(max = 250)
    @Column(name = "tech_id", length = 250, nullable = false)
    private String techID;

    @NotNull
    @Column(name = "remote_id", nullable = false)
    private Integer remoteID;

    @NotNull
    @Column(name = "quantite_total", nullable = false)
    private Double quantiteTotal;

    @NotNull
    @Column(name = "prix_total_commande", nullable = false)
    private Double prixTotalCommande;

    @NotNull
    @Column(name = "prix_ht", nullable = false)
    private Double prixHT;

    @NotNull
    @Column(name = "tva", nullable = false)
    private Double tva;

    @Column(name = "valid_sup")
    private Boolean validSup;

    @Column(name = "valid_res")
    private Boolean validRes;

    @Column(name = "est_actif")
    private Boolean estActif;

    @Column(name = "cree_le")
    private Instant creeLe;

    @Column(name = "cree_par")
    private String creePar;

    @Column(name = "modif_le")
    private Instant modifLe;

    @Column(name = "modif_par")
    private String modifPar;

    @OneToOne
    @JoinColumn(unique = true)
    private Facture facture;

    @ManyToOne
    @JsonIgnoreProperties("commandes")
    private Client client;

    @ManyToOne
    @JsonIgnoreProperties("commandes")
    private Employe commercial;

    @OneToMany(mappedBy = "commande")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Vente> ventes = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTechID() {
        return techID;
    }

    public Commande techID(String techID) {
        this.techID = techID;
        return this;
    }

    public void setTechID(String techID) {
        this.techID = techID;
    }

    public Integer getRemoteID() {
        return remoteID;
    }

    public Commande remoteID(Integer remoteID) {
        this.remoteID = remoteID;
        return this;
    }

    public void setRemoteID(Integer remoteID) {
        this.remoteID = remoteID;
    }

    public Double getQuantiteTotal() {
        return quantiteTotal;
    }

    public Commande quantiteTotal(Double quantiteTotal) {
        this.quantiteTotal = quantiteTotal;
        return this;
    }

    public void setQuantiteTotal(Double quantiteTotal) {
        this.quantiteTotal = quantiteTotal;
    }

    public Double getPrixTotalCommande() {
        return prixTotalCommande;
    }

    public Commande prixTotalCommande(Double prixTotalCommande) {
        this.prixTotalCommande = prixTotalCommande;
        return this;
    }

    public void setPrixTotalCommande(Double prixTotalCommande) {
        this.prixTotalCommande = prixTotalCommande;
    }

    public Double getPrixHT() {
        return prixHT;
    }

    public Commande prixHT(Double prixHT) {
        this.prixHT = prixHT;
        return this;
    }

    public void setPrixHT(Double prixHT) {
        this.prixHT = prixHT;
    }

    public Double getTva() {
        return tva;
    }

    public Commande tva(Double tva) {
        this.tva = tva;
        return this;
    }

    public void setTva(Double tva) {
        this.tva = tva;
    }

    public Boolean isValidSup() {
        return validSup;
    }

    public Commande validSup(Boolean validSup) {
        this.validSup = validSup;
        return this;
    }

    public void setValidSup(Boolean validSup) {
        this.validSup = validSup;
    }

    public Boolean isValidRes() {
        return validRes;
    }

    public Commande validRes(Boolean validRes) {
        this.validRes = validRes;
        return this;
    }

    public void setValidRes(Boolean validRes) {
        this.validRes = validRes;
    }

    public Boolean isEstActif() {
        return estActif;
    }

    public Commande estActif(Boolean estActif) {
        this.estActif = estActif;
        return this;
    }

    public void setEstActif(Boolean estActif) {
        this.estActif = estActif;
    }

    public Instant getCreeLe() {
        return creeLe;
    }

    public Commande creeLe(Instant creeLe) {
        this.creeLe = creeLe;
        return this;
    }

    public void setCreeLe(Instant creeLe) {
        this.creeLe = creeLe;
    }

    public String getCreePar() {
        return creePar;
    }

    public Commande creePar(String creePar) {
        this.creePar = creePar;
        return this;
    }

    public void setCreePar(String creePar) {
        this.creePar = creePar;
    }

    public Instant getModifLe() {
        return modifLe;
    }

    public Commande modifLe(Instant modifLe) {
        this.modifLe = modifLe;
        return this;
    }

    public void setModifLe(Instant modifLe) {
        this.modifLe = modifLe;
    }

    public String getModifPar() {
        return modifPar;
    }

    public Commande modifPar(String modifPar) {
        this.modifPar = modifPar;
        return this;
    }

    public void setModifPar(String modifPar) {
        this.modifPar = modifPar;
    }

    public Facture getFacture() {
        return facture;
    }

    public Commande facture(Facture facture) {
        this.facture = facture;
        return this;
    }

    public void setFacture(Facture facture) {
        this.facture = facture;
    }

    public Client getClient() {
        return client;
    }

    public Commande client(Client client) {
        this.client = client;
        return this;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Employe getCommercial() {
        return commercial;
    }

    public Commande commercial(Employe employe) {
        this.commercial = employe;
        return this;
    }

    public void setCommercial(Employe employe) {
        this.commercial = employe;
    }

    public Set<Vente> getVentes() {
        return ventes;
    }

    public Commande ventes(Set<Vente> ventes) {
        this.ventes = ventes;
        return this;
    }

    public Commande addVentes(Vente vente) {
        this.ventes.add(vente);
        vente.setCommande(this);
        return this;
    }

    public Commande removeVentes(Vente vente) {
        this.ventes.remove(vente);
        vente.setCommande(null);
        return this;
    }

    public void setVentes(Set<Vente> ventes) {
        this.ventes = ventes;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Commande)) {
            return false;
        }
        return id != null && id.equals(((Commande) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Commande{" +
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
            "}";
    }
}
