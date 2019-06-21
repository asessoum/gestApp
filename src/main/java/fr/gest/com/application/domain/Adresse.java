package fr.gest.com.application.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Adresse.
 */
@Entity
@Table(name = "adresse")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Adresse implements Serializable {

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

    @Column(name = "numero_rue")
    private Integer numeroRue;

    @Column(name = "nom_rue")
    private String nomRue;

    @Column(name = "complement")
    private String complement;

    @ManyToOne
    @JsonIgnoreProperties("adresses")
    private Fournisseur fournisseur;

    @ManyToOne
    @JsonIgnoreProperties("adresses")
    private Employe utilisateur;

    @ManyToOne
    @JsonIgnoreProperties("adresses")
    private Commune commune;

    @OneToMany(mappedBy = "adresse")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Partenaire> partenaires = new HashSet<>();

    @ManyToMany(mappedBy = "adresses")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Client> clients = new HashSet<>();

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

    public Adresse techID(String techID) {
        this.techID = techID;
        return this;
    }

    public void setTechID(String techID) {
        this.techID = techID;
    }

    public Integer getRemoteID() {
        return remoteID;
    }

    public Adresse remoteID(Integer remoteID) {
        this.remoteID = remoteID;
        return this;
    }

    public void setRemoteID(Integer remoteID) {
        this.remoteID = remoteID;
    }

    public Integer getNumeroRue() {
        return numeroRue;
    }

    public Adresse numeroRue(Integer numeroRue) {
        this.numeroRue = numeroRue;
        return this;
    }

    public void setNumeroRue(Integer numeroRue) {
        this.numeroRue = numeroRue;
    }

    public String getNomRue() {
        return nomRue;
    }

    public Adresse nomRue(String nomRue) {
        this.nomRue = nomRue;
        return this;
    }

    public void setNomRue(String nomRue) {
        this.nomRue = nomRue;
    }

    public String getComplement() {
        return complement;
    }

    public Adresse complement(String complement) {
        this.complement = complement;
        return this;
    }

    public void setComplement(String complement) {
        this.complement = complement;
    }

    public Fournisseur getFournisseur() {
        return fournisseur;
    }

    public Adresse fournisseur(Fournisseur fournisseur) {
        this.fournisseur = fournisseur;
        return this;
    }

    public void setFournisseur(Fournisseur fournisseur) {
        this.fournisseur = fournisseur;
    }

    public Employe getUtilisateur() {
        return utilisateur;
    }

    public Adresse utilisateur(Employe employe) {
        this.utilisateur = employe;
        return this;
    }

    public void setUtilisateur(Employe employe) {
        this.utilisateur = employe;
    }

    public Commune getCommune() {
        return commune;
    }

    public Adresse commune(Commune commune) {
        this.commune = commune;
        return this;
    }

    public void setCommune(Commune commune) {
        this.commune = commune;
    }

    public Set<Partenaire> getPartenaires() {
        return partenaires;
    }

    public Adresse partenaires(Set<Partenaire> partenaires) {
        this.partenaires = partenaires;
        return this;
    }

    public Adresse addPartenaires(Partenaire partenaire) {
        this.partenaires.add(partenaire);
        partenaire.setAdresse(this);
        return this;
    }

    public Adresse removePartenaires(Partenaire partenaire) {
        this.partenaires.remove(partenaire);
        partenaire.setAdresse(null);
        return this;
    }

    public void setPartenaires(Set<Partenaire> partenaires) {
        this.partenaires = partenaires;
    }

    public Set<Client> getClients() {
        return clients;
    }

    public Adresse clients(Set<Client> clients) {
        this.clients = clients;
        return this;
    }

    public Adresse addClients(Client client) {
        this.clients.add(client);
        client.getAdresses().add(this);
        return this;
    }

    public Adresse removeClients(Client client) {
        this.clients.remove(client);
        client.getAdresses().remove(this);
        return this;
    }

    public void setClients(Set<Client> clients) {
        this.clients = clients;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Adresse)) {
            return false;
        }
        return id != null && id.equals(((Adresse) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Adresse{" +
            "id=" + getId() +
            ", techID='" + getTechID() + "'" +
            ", remoteID=" + getRemoteID() +
            ", numeroRue=" + getNumeroRue() +
            ", nomRue='" + getNomRue() + "'" +
            ", complement='" + getComplement() + "'" +
            "}";
    }
}
