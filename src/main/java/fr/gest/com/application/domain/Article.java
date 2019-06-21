package fr.gest.com.application.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

import fr.gest.com.application.domain.enumeration.UniteVente;

/**
 * A Article.
 */
@Entity
@Table(name = "article")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Article implements Serializable {

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
    @Size(max = 20)
    @Column(name = "libelle", length = 20, nullable = false)
    private String libelle;

    @Size(max = 200)
    @Column(name = "description", length = 200)
    private String description;

    @Column(name = "prix_de_vente")
    private Double prixDeVente;

    @Column(name = "prix_de_revient")
    private Double prixDeRevient;

    @Column(name = "marge_brute")
    private Double margeBrute;

    @NotNull
    @Column(name = "est_compose", nullable = false)
    private Boolean estCompose;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "unite_vente", nullable = false)
    private UniteVente uniteVente;

    @Column(name = "pourcentage_tva")
    private Double pourcentageTva;

    @Column(name = "code_barre")
    private String codeBarre;

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

    @OneToMany(mappedBy = "articles")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Partenaire> partenaires = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("articles")
    private Categorie categorie;

    @ManyToOne
    @JsonIgnoreProperties("articles")
    private Reduction reduction;

    @ManyToOne
    @JsonIgnoreProperties("articles")
    private Fournisseur fournisseur;

    @ManyToOne
    @JsonIgnoreProperties("articles")
    private ArticleCompose composition;

    @ManyToOne
    @JsonIgnoreProperties("articles")
    private Stock stock;

    @OneToMany(mappedBy = "article")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Vente> ventes = new HashSet<>();

    @ManyToMany(mappedBy = "articles")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<MouvementStock> mouvementStocks = new HashSet<>();

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

    public Article techID(String techID) {
        this.techID = techID;
        return this;
    }

    public void setTechID(String techID) {
        this.techID = techID;
    }

    public Integer getRemoteID() {
        return remoteID;
    }

    public Article remoteID(Integer remoteID) {
        this.remoteID = remoteID;
        return this;
    }

    public void setRemoteID(Integer remoteID) {
        this.remoteID = remoteID;
    }

    public String getLibelle() {
        return libelle;
    }

    public Article libelle(String libelle) {
        this.libelle = libelle;
        return this;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }

    public String getDescription() {
        return description;
    }

    public Article description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrixDeVente() {
        return prixDeVente;
    }

    public Article prixDeVente(Double prixDeVente) {
        this.prixDeVente = prixDeVente;
        return this;
    }

    public void setPrixDeVente(Double prixDeVente) {
        this.prixDeVente = prixDeVente;
    }

    public Double getPrixDeRevient() {
        return prixDeRevient;
    }

    public Article prixDeRevient(Double prixDeRevient) {
        this.prixDeRevient = prixDeRevient;
        return this;
    }

    public void setPrixDeRevient(Double prixDeRevient) {
        this.prixDeRevient = prixDeRevient;
    }

    public Double getMargeBrute() {
        return margeBrute;
    }

    public Article margeBrute(Double margeBrute) {
        this.margeBrute = margeBrute;
        return this;
    }

    public void setMargeBrute(Double margeBrute) {
        this.margeBrute = margeBrute;
    }

    public Boolean isEstCompose() {
        return estCompose;
    }

    public Article estCompose(Boolean estCompose) {
        this.estCompose = estCompose;
        return this;
    }

    public void setEstCompose(Boolean estCompose) {
        this.estCompose = estCompose;
    }

    public UniteVente getUniteVente() {
        return uniteVente;
    }

    public Article uniteVente(UniteVente uniteVente) {
        this.uniteVente = uniteVente;
        return this;
    }

    public void setUniteVente(UniteVente uniteVente) {
        this.uniteVente = uniteVente;
    }

    public Double getPourcentageTva() {
        return pourcentageTva;
    }

    public Article pourcentageTva(Double pourcentageTva) {
        this.pourcentageTva = pourcentageTva;
        return this;
    }

    public void setPourcentageTva(Double pourcentageTva) {
        this.pourcentageTva = pourcentageTva;
    }

    public String getCodeBarre() {
        return codeBarre;
    }

    public Article codeBarre(String codeBarre) {
        this.codeBarre = codeBarre;
        return this;
    }

    public void setCodeBarre(String codeBarre) {
        this.codeBarre = codeBarre;
    }

    public Boolean isEstActif() {
        return estActif;
    }

    public Article estActif(Boolean estActif) {
        this.estActif = estActif;
        return this;
    }

    public void setEstActif(Boolean estActif) {
        this.estActif = estActif;
    }

    public Instant getCreeLe() {
        return creeLe;
    }

    public Article creeLe(Instant creeLe) {
        this.creeLe = creeLe;
        return this;
    }

    public void setCreeLe(Instant creeLe) {
        this.creeLe = creeLe;
    }

    public String getCreePar() {
        return creePar;
    }

    public Article creePar(String creePar) {
        this.creePar = creePar;
        return this;
    }

    public void setCreePar(String creePar) {
        this.creePar = creePar;
    }

    public Instant getModifLe() {
        return modifLe;
    }

    public Article modifLe(Instant modifLe) {
        this.modifLe = modifLe;
        return this;
    }

    public void setModifLe(Instant modifLe) {
        this.modifLe = modifLe;
    }

    public String getModifPar() {
        return modifPar;
    }

    public Article modifPar(String modifPar) {
        this.modifPar = modifPar;
        return this;
    }

    public void setModifPar(String modifPar) {
        this.modifPar = modifPar;
    }

    public Set<Partenaire> getPartenaires() {
        return partenaires;
    }

    public Article partenaires(Set<Partenaire> partenaires) {
        this.partenaires = partenaires;
        return this;
    }

    public Article addPartenaire(Partenaire partenaire) {
        this.partenaires.add(partenaire);
        partenaire.setArticles(this);
        return this;
    }

    public Article removePartenaire(Partenaire partenaire) {
        this.partenaires.remove(partenaire);
        partenaire.setArticles(null);
        return this;
    }

    public void setPartenaires(Set<Partenaire> partenaires) {
        this.partenaires = partenaires;
    }

    public Categorie getCategorie() {
        return categorie;
    }

    public Article categorie(Categorie categorie) {
        this.categorie = categorie;
        return this;
    }

    public void setCategorie(Categorie categorie) {
        this.categorie = categorie;
    }

    public Reduction getReduction() {
        return reduction;
    }

    public Article reduction(Reduction reduction) {
        this.reduction = reduction;
        return this;
    }

    public void setReduction(Reduction reduction) {
        this.reduction = reduction;
    }

    public Fournisseur getFournisseur() {
        return fournisseur;
    }

    public Article fournisseur(Fournisseur fournisseur) {
        this.fournisseur = fournisseur;
        return this;
    }

    public void setFournisseur(Fournisseur fournisseur) {
        this.fournisseur = fournisseur;
    }

    public ArticleCompose getComposition() {
        return composition;
    }

    public Article composition(ArticleCompose articleCompose) {
        this.composition = articleCompose;
        return this;
    }

    public void setComposition(ArticleCompose articleCompose) {
        this.composition = articleCompose;
    }

    public Stock getStock() {
        return stock;
    }

    public Article stock(Stock stock) {
        this.stock = stock;
        return this;
    }

    public void setStock(Stock stock) {
        this.stock = stock;
    }

    public Set<Vente> getVentes() {
        return ventes;
    }

    public Article ventes(Set<Vente> ventes) {
        this.ventes = ventes;
        return this;
    }

    public Article addVentes(Vente vente) {
        this.ventes.add(vente);
        vente.setArticle(this);
        return this;
    }

    public Article removeVentes(Vente vente) {
        this.ventes.remove(vente);
        vente.setArticle(null);
        return this;
    }

    public void setVentes(Set<Vente> ventes) {
        this.ventes = ventes;
    }

    public Set<MouvementStock> getMouvementStocks() {
        return mouvementStocks;
    }

    public Article mouvementStocks(Set<MouvementStock> mouvementStocks) {
        this.mouvementStocks = mouvementStocks;
        return this;
    }

    public Article addMouvementStock(MouvementStock mouvementStock) {
        this.mouvementStocks.add(mouvementStock);
        mouvementStock.getArticles().add(this);
        return this;
    }

    public Article removeMouvementStock(MouvementStock mouvementStock) {
        this.mouvementStocks.remove(mouvementStock);
        mouvementStock.getArticles().remove(this);
        return this;
    }

    public void setMouvementStocks(Set<MouvementStock> mouvementStocks) {
        this.mouvementStocks = mouvementStocks;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Article)) {
            return false;
        }
        return id != null && id.equals(((Article) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Article{" +
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
            "}";
    }
}
