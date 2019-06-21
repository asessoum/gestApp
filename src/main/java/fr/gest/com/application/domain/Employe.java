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

import fr.gest.com.application.domain.enumeration.Genre;

/**
 * A Employe.
 */
@Entity
@Table(name = "employe")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Employe implements Serializable {

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
    @Enumerated(EnumType.STRING)
    @Column(name = "genre", nullable = false)
    private Genre genre;

    @NotNull
    @Size(max = 20)
    @Column(name = "num_carte_uti", length = 20, nullable = false)
    private String numCarteUti;

    @Column(name = "date_carte_uti")
    private Instant dateCarteUti;

    @Size(max = 200)
    @Column(name = "photo_id", length = 200)
    private String photoID;

    @Size(max = 500)
    @Column(name = "description", length = 500)
    private String description;

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
    private Utilisateur utilisateur;

    @ManyToOne
    @JsonIgnoreProperties("employes")
    private Partenaire responsable;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "employe_langues",
               joinColumns = @JoinColumn(name = "employe_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "langues_id", referencedColumnName = "id"))
    private Set<Langue> langues = new HashSet<>();

    @OneToMany(mappedBy = "utilisateur")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Adresse> adresses = new HashSet<>();

    @OneToMany(mappedBy = "employe")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<UtiProfile> profiles = new HashSet<>();

    @OneToMany(mappedBy = "commercial")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Client> clients = new HashSet<>();

    @OneToMany(mappedBy = "commercial")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Commande> commandes = new HashSet<>();

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

    public Employe techID(String techID) {
        this.techID = techID;
        return this;
    }

    public void setTechID(String techID) {
        this.techID = techID;
    }

    public Integer getRemoteID() {
        return remoteID;
    }

    public Employe remoteID(Integer remoteID) {
        this.remoteID = remoteID;
        return this;
    }

    public void setRemoteID(Integer remoteID) {
        this.remoteID = remoteID;
    }

    public Genre getGenre() {
        return genre;
    }

    public Employe genre(Genre genre) {
        this.genre = genre;
        return this;
    }

    public void setGenre(Genre genre) {
        this.genre = genre;
    }

    public String getNumCarteUti() {
        return numCarteUti;
    }

    public Employe numCarteUti(String numCarteUti) {
        this.numCarteUti = numCarteUti;
        return this;
    }

    public void setNumCarteUti(String numCarteUti) {
        this.numCarteUti = numCarteUti;
    }

    public Instant getDateCarteUti() {
        return dateCarteUti;
    }

    public Employe dateCarteUti(Instant dateCarteUti) {
        this.dateCarteUti = dateCarteUti;
        return this;
    }

    public void setDateCarteUti(Instant dateCarteUti) {
        this.dateCarteUti = dateCarteUti;
    }

    public String getPhotoID() {
        return photoID;
    }

    public Employe photoID(String photoID) {
        this.photoID = photoID;
        return this;
    }

    public void setPhotoID(String photoID) {
        this.photoID = photoID;
    }

    public String getDescription() {
        return description;
    }

    public Employe description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean isEstActif() {
        return estActif;
    }

    public Employe estActif(Boolean estActif) {
        this.estActif = estActif;
        return this;
    }

    public void setEstActif(Boolean estActif) {
        this.estActif = estActif;
    }

    public Instant getCreeLe() {
        return creeLe;
    }

    public Employe creeLe(Instant creeLe) {
        this.creeLe = creeLe;
        return this;
    }

    public void setCreeLe(Instant creeLe) {
        this.creeLe = creeLe;
    }

    public String getCreePar() {
        return creePar;
    }

    public Employe creePar(String creePar) {
        this.creePar = creePar;
        return this;
    }

    public void setCreePar(String creePar) {
        this.creePar = creePar;
    }

    public Instant getModifLe() {
        return modifLe;
    }

    public Employe modifLe(Instant modifLe) {
        this.modifLe = modifLe;
        return this;
    }

    public void setModifLe(Instant modifLe) {
        this.modifLe = modifLe;
    }

    public String getModifPar() {
        return modifPar;
    }

    public Employe modifPar(String modifPar) {
        this.modifPar = modifPar;
        return this;
    }

    public void setModifPar(String modifPar) {
        this.modifPar = modifPar;
    }

    public Utilisateur getUtilisateur() {
        return utilisateur;
    }

    public Employe utilisateur(Utilisateur utilisateur) {
        this.utilisateur = utilisateur;
        return this;
    }

    public void setUtilisateur(Utilisateur utilisateur) {
        this.utilisateur = utilisateur;
    }

    public Partenaire getResponsable() {
        return responsable;
    }

    public Employe responsable(Partenaire partenaire) {
        this.responsable = partenaire;
        return this;
    }

    public void setResponsable(Partenaire partenaire) {
        this.responsable = partenaire;
    }

    public Set<Langue> getLangues() {
        return langues;
    }

    public Employe langues(Set<Langue> langues) {
        this.langues = langues;
        return this;
    }

    public Employe addLangues(Langue langue) {
        this.langues.add(langue);
        langue.getEmployes().add(this);
        return this;
    }

    public Employe removeLangues(Langue langue) {
        this.langues.remove(langue);
        langue.getEmployes().remove(this);
        return this;
    }

    public void setLangues(Set<Langue> langues) {
        this.langues = langues;
    }

    public Set<Adresse> getAdresses() {
        return adresses;
    }

    public Employe adresses(Set<Adresse> adresses) {
        this.adresses = adresses;
        return this;
    }

    public Employe addAdresses(Adresse adresse) {
        this.adresses.add(adresse);
        adresse.setUtilisateur(this);
        return this;
    }

    public Employe removeAdresses(Adresse adresse) {
        this.adresses.remove(adresse);
        adresse.setUtilisateur(null);
        return this;
    }

    public void setAdresses(Set<Adresse> adresses) {
        this.adresses = adresses;
    }

    public Set<UtiProfile> getProfiles() {
        return profiles;
    }

    public Employe profiles(Set<UtiProfile> utiProfiles) {
        this.profiles = utiProfiles;
        return this;
    }

    public Employe addProfiles(UtiProfile utiProfile) {
        this.profiles.add(utiProfile);
        utiProfile.setEmploye(this);
        return this;
    }

    public Employe removeProfiles(UtiProfile utiProfile) {
        this.profiles.remove(utiProfile);
        utiProfile.setEmploye(null);
        return this;
    }

    public void setProfiles(Set<UtiProfile> utiProfiles) {
        this.profiles = utiProfiles;
    }

    public Set<Client> getClients() {
        return clients;
    }

    public Employe clients(Set<Client> clients) {
        this.clients = clients;
        return this;
    }

    public Employe addClients(Client client) {
        this.clients.add(client);
        client.setCommercial(this);
        return this;
    }

    public Employe removeClients(Client client) {
        this.clients.remove(client);
        client.setCommercial(null);
        return this;
    }

    public void setClients(Set<Client> clients) {
        this.clients = clients;
    }

    public Set<Commande> getCommandes() {
        return commandes;
    }

    public Employe commandes(Set<Commande> commandes) {
        this.commandes = commandes;
        return this;
    }

    public Employe addCommandes(Commande commande) {
        this.commandes.add(commande);
        commande.setCommercial(this);
        return this;
    }

    public Employe removeCommandes(Commande commande) {
        this.commandes.remove(commande);
        commande.setCommercial(null);
        return this;
    }

    public void setCommandes(Set<Commande> commandes) {
        this.commandes = commandes;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Employe)) {
            return false;
        }
        return id != null && id.equals(((Employe) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Employe{" +
            "id=" + getId() +
            ", techID='" + getTechID() + "'" +
            ", remoteID=" + getRemoteID() +
            ", genre='" + getGenre() + "'" +
            ", numCarteUti='" + getNumCarteUti() + "'" +
            ", dateCarteUti='" + getDateCarteUti() + "'" +
            ", photoID='" + getPhotoID() + "'" +
            ", description='" + getDescription() + "'" +
            ", estActif='" + isEstActif() + "'" +
            ", creeLe='" + getCreeLe() + "'" +
            ", creePar='" + getCreePar() + "'" +
            ", modifLe='" + getModifLe() + "'" +
            ", modifPar='" + getModifPar() + "'" +
            "}";
    }
}
