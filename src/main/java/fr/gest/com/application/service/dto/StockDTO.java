package fr.gest.com.application.service.dto;
import java.time.Instant;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link fr.gest.com.application.domain.Stock} entity.
 */
public class StockDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(max = 250)
    private String techID;

    @NotNull
    private Integer remoteID;

    private Double quantite;

    private Double quantiteMin;

    private Double quantiteMax;

    private Instant dateModification;


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

    public Double getQuantite() {
        return quantite;
    }

    public void setQuantite(Double quantite) {
        this.quantite = quantite;
    }

    public Double getQuantiteMin() {
        return quantiteMin;
    }

    public void setQuantiteMin(Double quantiteMin) {
        this.quantiteMin = quantiteMin;
    }

    public Double getQuantiteMax() {
        return quantiteMax;
    }

    public void setQuantiteMax(Double quantiteMax) {
        this.quantiteMax = quantiteMax;
    }

    public Instant getDateModification() {
        return dateModification;
    }

    public void setDateModification(Instant dateModification) {
        this.dateModification = dateModification;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        StockDTO stockDTO = (StockDTO) o;
        if (stockDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), stockDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "StockDTO{" +
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
