package fr.gest.com.application.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A Stock.
 */
@Entity
@Table(name = "stock")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Stock implements Serializable {

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

    @Column(name = "quantite")
    private Double quantite;

    @Column(name = "quantite_min")
    private Double quantiteMin;

    @Column(name = "quantite_max")
    private Double quantiteMax;

    @Column(name = "date_modification")
    private Instant dateModification;

    @OneToMany(mappedBy = "stock")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
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

    public Stock techID(String techID) {
        this.techID = techID;
        return this;
    }

    public void setTechID(String techID) {
        this.techID = techID;
    }

    public Integer getRemoteID() {
        return remoteID;
    }

    public Stock remoteID(Integer remoteID) {
        this.remoteID = remoteID;
        return this;
    }

    public void setRemoteID(Integer remoteID) {
        this.remoteID = remoteID;
    }

    public Double getQuantite() {
        return quantite;
    }

    public Stock quantite(Double quantite) {
        this.quantite = quantite;
        return this;
    }

    public void setQuantite(Double quantite) {
        this.quantite = quantite;
    }

    public Double getQuantiteMin() {
        return quantiteMin;
    }

    public Stock quantiteMin(Double quantiteMin) {
        this.quantiteMin = quantiteMin;
        return this;
    }

    public void setQuantiteMin(Double quantiteMin) {
        this.quantiteMin = quantiteMin;
    }

    public Double getQuantiteMax() {
        return quantiteMax;
    }

    public Stock quantiteMax(Double quantiteMax) {
        this.quantiteMax = quantiteMax;
        return this;
    }

    public void setQuantiteMax(Double quantiteMax) {
        this.quantiteMax = quantiteMax;
    }

    public Instant getDateModification() {
        return dateModification;
    }

    public Stock dateModification(Instant dateModification) {
        this.dateModification = dateModification;
        return this;
    }

    public void setDateModification(Instant dateModification) {
        this.dateModification = dateModification;
    }

    public Set<Article> getArticles() {
        return articles;
    }

    public Stock articles(Set<Article> articles) {
        this.articles = articles;
        return this;
    }

    public Stock addArticles(Article article) {
        this.articles.add(article);
        article.setStock(this);
        return this;
    }

    public Stock removeArticles(Article article) {
        this.articles.remove(article);
        article.setStock(null);
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
        if (!(o instanceof Stock)) {
            return false;
        }
        return id != null && id.equals(((Stock) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Stock{" +
            "id=" + getId() +
            ", techID='" + getTechID() + "'" +
            ", remoteID=" + getRemoteID() +
            ", quantite=" + getQuantite() +
            ", quantiteMin=" + getQuantiteMin() +
            ", quantiteMax=" + getQuantiteMax() +
            ", dateModification='" + getDateModification() + "'" +
            "}";
    }
}
