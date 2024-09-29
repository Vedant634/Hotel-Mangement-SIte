    package com.nirvana.Nirvana.Hotel.entity;

    import jakarta.persistence.*;
    import lombok.Data;
    import lombok.Generated;
    import org.springframework.security.core.GrantedAuthority;
    import org.springframework.security.core.authority.SimpleGrantedAuthority;
    import org.springframework.security.core.userdetails.UserDetails;

    import javax.validation.constraints.NotBlank;
    import javax.validation.constraints.Size;
    import java.util.ArrayList;
    import java.util.Collection;
    import java.util.List;

    @Entity
    @Data
    @Table(name="users")
    public class User implements UserDetails {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
        @NotBlank(message = "Email is required")
        @Column(unique = true)
        private String email;
        @NotBlank(message = "Name is required")
        private String name;
        @NotBlank(message = "Phone Number is required")
        @Size(min = 10, max = 10, message = "Phone Number must be 10 digits long")
        private String phoneNumber;
        @NotBlank(message = "Password is required")
        private String password;
        private String role;

        @OneToMany(mappedBy = "user",fetch = FetchType.LAZY ,cascade = CascadeType.ALL)
        private List<Booking> booking = new ArrayList<>();

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            return List.of(new SimpleGrantedAuthority(role));
        }

        @Override
        public String getUsername() {
            return email;
        }

        @Override
        public boolean isAccountNonExpired() {
            return true;
        }

        @Override
        public boolean isAccountNonLocked() {
            return true;
        }

        @Override
        public boolean isCredentialsNonExpired() {
            return true;
        }

        @Override
        public boolean isEnabled() {
            return true;
        }
    }
