package fr.gest.com.application.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Habilitation.
 */
@Entity
@Table(name = "habilitation")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Habilitation implements Serializable {

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
    @Size(max = 15)
    @Column(name = "profile", length = 15, nullable = false)
    private String profile;

    @NotNull
    @Size(max = 50)
    @Column(name = "ressource", length = 50, nullable = false)
    private String ressource;

    @NotNull
    @Size(max = 10)
    @Column(name = "permission", length = 10, nullable = false)
    private String permission;

    @NotNull
    @Size(max = 2)
    @Column(name = "acces", length = 2, nullable = false)
    private String acces;

    @OneToMany(mappedBy = "habilitations")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Partenaire> partenaires = new HashSet<>();

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

    public Habilitation techID(String techID) {
        this.techID = techID;
        return this;
    }

    public void setTechID(String techID) {
        this.techID = techID;
    }

    public Integer getRemoteID() {
        return remoteID;
    }

    public Habilitation remoteID(Integer remoteID) {
        this.remoteID = remoteID;
        return this;
    }

    public void setRemoteID(Integer remoteID) {
        this.remoteID = remoteID;
    }

    public String getProfile() {
        return profile;
    }

    public Habilitation profile(String profile) {
        this.profile = profile;
        return this;
    }

    public void setProfile(String profile) {
        this.profile = profile;
    }

    public String getRessource() {
        return ressource;
    }

    public Habilitation ressource(String ressource) {
        this.ressource = ressource;
        return this;
    }

    public void setRessource(String ressource) {
        this.ressource = ressource;
    }

    public String getPermission() {
        return permission;
    }

    public Habilitation permission(String permission) {
        this.permission = permission;
        return this;
    }

    public void setPermission(String permission) {
        this.permission = permission;
    }

    public String getAcces() {
        return acces;
    }

    public Habilitation acces(String acces) {
        this.acces = acces;
        return this;
    }

    public void setAcces(String acces) {
        this.acces = acces;
    }

    public Set<Partenaire> getPartenaires() {
        return partenaires;
    }

    public Habilitation partenaires(Set<Partenaire> partenaires) {
        this.partenaires = partenaires;
        return this;
    }

    public Habilitation addPartenaire(Partenaire partenaire) {
        this.partenaires.add(partenaire);
        partenaire.setHabilitations(this);
        return this;
    }

    public Habilitation removePartenaire(Partenaire partenaire) {
        this.partenaires.remove(partenaire);
        partenaire.setHabilitations(null);
        return this;
    }

    public void setPartenaires(Set<Partenaire> partenaires) {
        this.partenaires = partenaires;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Habilitation)) {
            return false;
        }
        return id != null && id.equals(((Habilitation) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Habilitation{" +
            "id=" + getId() +
            ", techID='" + getTechID() + "'" +
            ", remoteID=" + getRemoteID() +
            ", profile='" + getProfile() + "'" +
            ", ressource='" + getRessource() + "'" +
            ", permission='" + getPermission() + "'" +
            ", acces='" + getAcces() + "'" +
            "}";
    }
}
