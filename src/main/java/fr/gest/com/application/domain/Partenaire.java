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
 * A Partenaire.
 */
@Entity
@Table(name = "partenaire")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Partenaire implements Serializable {

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

    @Size(max = 50)
    @Column(name = "raison_sociale", length = 50)
    private String raisonSociale;

    @Column(name = "nombre_salaries")
    private Double nombreSalaries;

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

    @ManyToOne
    @JsonIgnoreProperties("partenaires")
    private Langue langue;

    @ManyToOne
    @JsonIgnoreProperties("partenaires")
    private Adresse adresse;

    @ManyToOne
    @JsonIgnoreProperties("partenaires")
    private Reference references;

    @ManyToOne
    @JsonIgnoreProperties("partenaires")
    private Categorie categories;

    @ManyToOne
    @JsonIgnoreProperties("partenaires")
    private Article articles;

    @ManyToOne
    @JsonIgnoreProperties("partenaires")
    private Reduction reductions;

    @ManyToOne
    @JsonIgnoreProperties("partenaires")
    private Profile profiles;

    @ManyToOne
    @JsonIgnoreProperties("partenaires")
    private Habilitation habilitations;

    @ManyToOne
    @JsonIgnoreProperties("partenaires")
    private Fournisseur fournisseurs;

    @OneToMany(mappedBy = "responsable")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Employe> employes = new HashSet<>();

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

    public Partenaire techID(String techID) {
        this.techID = techID;
        return this;
    }

    public void setTechID(String techID) {
        this.techID = techID;
    }

    public Integer getRemoteID() {
        return remoteID;
    }

    public Partenaire remoteID(Integer remoteID) {
        this.remoteID = remoteID;
        return this;
    }

    public void setRemoteID(Integer remoteID) {
        this.remoteID = remoteID;
    }

    public String getRaisonSociale() {
        return raisonSociale;
    }

    public Partenaire raisonSociale(String raisonSociale) {
        this.raisonSociale = raisonSociale;
        return this;
    }

    public void setRaisonSociale(String raisonSociale) {
        this.raisonSociale = raisonSociale;
    }

    public Double getNombreSalaries() {
        return nombreSalaries;
    }

    public Partenaire nombreSalaries(Double nombreSalaries) {
        this.nombreSalaries = nombreSalaries;
        return this;
    }

    public void setNombreSalaries(Double nombreSalaries) {
        this.nombreSalaries = nombreSalaries;
    }

    public Boolean isEstActif() {
        return estActif;
    }

    public Partenaire estActif(Boolean estActif) {
        this.estActif = estActif;
        return this;
    }

    public void setEstActif(Boolean estActif) {
        this.estActif = estActif;
    }

    public Instant getCreeLe() {
        return creeLe;
    }

    public Partenaire creeLe(Instant creeLe) {
        this.creeLe = creeLe;
        return this;
    }

    public void setCreeLe(Instant creeLe) {
        this.creeLe = creeLe;
    }

    public String getCreePar() {
        return creePar;
    }

    public Partenaire creePar(String creePar) {
        this.creePar = creePar;
        return this;
    }

    public void setCreePar(String creePar) {
        this.creePar = creePar;
    }

    public Instant getModifLe() {
        return modifLe;
    }

    public Partenaire modifLe(Instant modifLe) {
        this.modifLe = modifLe;
        return this;
    }

    public void setModifLe(Instant modifLe) {
        this.modifLe = modifLe;
    }

    public String getModifPar() {
        return modifPar;
    }

    public Partenaire modifPar(String modifPar) {
        this.modifPar = modifPar;
        return this;
    }

    public void setModifPar(String modifPar) {
        this.modifPar = modifPar;
    }

    public Langue getLangue() {
        return langue;
    }

    public Partenaire langue(Langue langue) {
        this.langue = langue;
        return this;
    }

    public void setLangue(Langue langue) {
        this.langue = langue;
    }

    public Adresse getAdresse() {
        return adresse;
    }

    public Partenaire adresse(Adresse adresse) {
        this.adresse = adresse;
        return this;
    }

    public void setAdresse(Adresse adresse) {
        this.adresse = adresse;
    }

    public Reference getReferences() {
        return references;
    }

    public Partenaire references(Reference reference) {
        this.references = reference;
        return this;
    }

    public void setReferences(Reference reference) {
        this.references = reference;
    }

    public Categorie getCategories() {
        return categories;
    }

    public Partenaire categories(Categorie categorie) {
        this.categories = categorie;
        return this;
    }

    public void setCategories(Categorie categorie) {
        this.categories = categorie;
    }

    public Article getArticles() {
        return articles;
    }

    public Partenaire articles(Article article) {
        this.articles = article;
        return this;
    }

    public void setArticles(Article article) {
        this.articles = article;
    }

    public Reduction getReductions() {
        return reductions;
    }

    public Partenaire reductions(Reduction reduction) {
        this.reductions = reduction;
        return this;
    }

    public void setReductions(Reduction reduction) {
        this.reductions = reduction;
    }

    public Profile getProfiles() {
        return profiles;
    }

    public Partenaire profiles(Profile profile) {
        this.profiles = profile;
        return this;
    }

    public void setProfiles(Profile profile) {
        this.profiles = profile;
    }

    public Habilitation getHabilitations() {
        return habilitations;
    }

    public Partenaire habilitations(Habilitation habilitation) {
        this.habilitations = habilitation;
        return this;
    }

    public void setHabilitations(Habilitation habilitation) {
        this.habilitations = habilitation;
    }

    public Fournisseur getFournisseurs() {
        return fournisseurs;
    }

    public Partenaire fournisseurs(Fournisseur fournisseur) {
        this.fournisseurs = fournisseur;
        return this;
    }

    public void setFournisseurs(Fournisseur fournisseur) {
        this.fournisseurs = fournisseur;
    }

    public Set<Employe> getEmployes() {
        return employes;
    }

    public Partenaire employes(Set<Employe> employes) {
        this.employes = employes;
        return this;
    }

    public Partenaire addEmployes(Employe employe) {
        this.employes.add(employe);
        employe.setResponsable(this);
        return this;
    }

    public Partenaire removeEmployes(Employe employe) {
        this.employes.remove(employe);
        employe.setResponsable(null);
        return this;
    }

    public void setEmployes(Set<Employe> employes) {
        this.employes = employes;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Partenaire)) {
            return false;
        }
        return id != null && id.equals(((Partenaire) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Partenaire{" +
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
            "}";
    }
}
