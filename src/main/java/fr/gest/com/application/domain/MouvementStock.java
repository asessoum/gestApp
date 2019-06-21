package fr.gest.com.application.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

import fr.gest.com.application.domain.enumeration.TypeMouvementStock;

/**
 * A MouvementStock.
 */
@Entity
@Table(name = "mouvement_stock")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class MouvementStock implements Serializable {

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
    @Column(name = "prix_total", nullable = false)
    private Double prixTotal;

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

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private TypeMouvementStock type;

    @Column(name = "cree_le")
    private Instant creeLe;

    @Column(name = "cree_par")
    private String creePar;

    @Column(name = "modif_le")
    private Instant modifLe;

    @Column(name = "modif_par")
    private String modifPar;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "mouvement_stock_articles",
               joinColumns = @JoinColumn(name = "mouvement_stock_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "articles_id", referencedColumnName = "id"))
    private Set<Article> articles = new HashSet<>();

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

    public MouvementStock techID(String techID) {
        this.techID = techID;
        return this;
    }

    public void setTechID(String techID) {
        this.techID = techID;
    }

    public Integer getRemoteID() {
        return remoteID;
    }

    public MouvementStock remoteID(Integer remoteID) {
        this.remoteID = remoteID;
        return this;
    }

    public void setRemoteID(Integer remoteID) {
        this.remoteID = remoteID;
    }

    public Double getQuantiteTotal() {
        return quantiteTotal;
    }

    public MouvementStock quantiteTotal(Double quantiteTotal) {
        this.quantiteTotal = quantiteTotal;
        return this;
    }

    public void setQuantiteTotal(Double quantiteTotal) {
        this.quantiteTotal = quantiteTotal;
    }

    public Double getPrixTotal() {
        return prixTotal;
    }

    public MouvementStock prixTotal(Double prixTotal) {
        this.prixTotal = prixTotal;
        return this;
    }

    public void setPrixTotal(Double prixTotal) {
        this.prixTotal = prixTotal;
    }

    public Double getPrixHT() {
        return prixHT;
    }

    public MouvementStock prixHT(Double prixHT) {
        this.prixHT = prixHT;
        return this;
    }

    public void setPrixHT(Double prixHT) {
        this.prixHT = prixHT;
    }

    public Double getTva() {
        return tva;
    }

    public MouvementStock tva(Double tva) {
        this.tva = tva;
        return this;
    }

    public void setTva(Double tva) {
        this.tva = tva;
    }

    public Boolean isValidSup() {
        return validSup;
    }

    public MouvementStock validSup(Boolean validSup) {
        this.validSup = validSup;
        return this;
    }

    public void setValidSup(Boolean validSup) {
        this.validSup = validSup;
    }

    public Boolean isValidRes() {
        return validRes;
    }

    public MouvementStock validRes(Boolean validRes) {
        this.validRes = validRes;
        return this;
    }

    public void setValidRes(Boolean validRes) {
        this.validRes = validRes;
    }

    public Boolean isEstActif() {
        return estActif;
    }

    public MouvementStock estActif(Boolean estActif) {
        this.estActif = estActif;
        return this;
    }

    public void setEstActif(Boolean estActif) {
        this.estActif = estActif;
    }

    public TypeMouvementStock getType() {
        return type;
    }

    public MouvementStock type(TypeMouvementStock type) {
        this.type = type;
        return this;
    }

    public void setType(TypeMouvementStock type) {
        this.type = type;
    }

    public Instant getCreeLe() {
        return creeLe;
    }

    public MouvementStock creeLe(Instant creeLe) {
        this.creeLe = creeLe;
        return this;
    }

    public void setCreeLe(Instant creeLe) {
        this.creeLe = creeLe;
    }

    public String getCreePar() {
        return creePar;
    }

    public MouvementStock creePar(String creePar) {
        this.creePar = creePar;
        return this;
    }

    public void setCreePar(String creePar) {
        this.creePar = creePar;
    }

    public Instant getModifLe() {
        return modifLe;
    }

    public MouvementStock modifLe(Instant modifLe) {
        this.modifLe = modifLe;
        return this;
    }

    public void setModifLe(Instant modifLe) {
        this.modifLe = modifLe;
    }

    public String getModifPar() {
        return modifPar;
    }

    public MouvementStock modifPar(String modifPar) {
        this.modifPar = modifPar;
        return this;
    }

    public void setModifPar(String modifPar) {
        this.modifPar = modifPar;
    }

    public Set<Article> getArticles() {
        return articles;
    }

    public MouvementStock articles(Set<Article> articles) {
        this.articles = articles;
        return this;
    }

    public MouvementStock addArticles(Article article) {
        this.articles.add(article);
        article.getMouvementStocks().add(this);
        return this;
    }

    public MouvementStock removeArticles(Article article) {
        this.articles.remove(article);
        article.getMouvementStocks().remove(this);
        return this;
    }

    public void setArticles(Set<Article> articles) {
        this.articles = articles;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MouvementStock)) {
            return false;
        }
        return id != null && id.equals(((MouvementStock) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "MouvementStock{" +
            "id=" + getId() +
            ", techID='" + getTechID() + "'" +
            ", remoteID=" + getRemoteID() +
            ", quantiteTotal=" + getQuantiteTotal() +
            ", prixTotal=" + getPrixTotal() +
            ", prixHT=" + getPrixHT() +
            ", tva=" + getTva() +
            ", validSup='" + isValidSup() + "'" +
            ", validRes='" + isValidRes() + "'" +
            ", estActif='" + isEstActif() + "'" +
            ", type='" + getType() + "'" +
            ", creeLe='" + getCreeLe() + "'" +
            ", creePar='" + getCreePar() + "'" +
            ", modifLe='" + getModifLe() + "'" +
            ", modifPar='" + getModifPar() + "'" +
            "}";
    }
}
