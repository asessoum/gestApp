package fr.gest.com.application.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A ArticleCompose.
 */
@Entity
@Table(name = "article_compose")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ArticleCompose implements Serializable {

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

    @Column(name = "nombre")
    private Double nombre;

    @OneToMany(mappedBy = "composition")
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

    public ArticleCompose techID(String techID) {
        this.techID = techID;
        return this;
    }

    public void setTechID(String techID) {
        this.techID = techID;
    }

    public Integer getRemoteID() {
        return remoteID;
    }

    public ArticleCompose remoteID(Integer remoteID) {
        this.remoteID = remoteID;
        return this;
    }

    public void setRemoteID(Integer remoteID) {
        this.remoteID = remoteID;
    }

    public Double getNombre() {
        return nombre;
    }

    public ArticleCompose nombre(Double nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(Double nombre) {
        this.nombre = nombre;
    }

    public Set<Article> getArticles() {
        return articles;
    }

    public ArticleCompose articles(Set<Article> articles) {
        this.articles = articles;
        return this;
    }

    public ArticleCompose addArticles(Article article) {
        this.articles.add(article);
        article.setComposition(this);
        return this;
    }

    public ArticleCompose removeArticles(Article article) {
        this.articles.remove(article);
        article.setComposition(null);
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
        if (!(o instanceof ArticleCompose)) {
            return false;
        }
        return id != null && id.equals(((ArticleCompose) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ArticleCompose{" +
            "id=" + getId() +
            ", techID='" + getTechID() + "'" +
            ", remoteID=" + getRemoteID() +
            ", nombre=" + getNombre() +
            "}";
    }
}
