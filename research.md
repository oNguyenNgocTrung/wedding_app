# Wedding App - Detailed Codebase Research Report

## 1. Overview

This is a **personal wedding website** built for the wedding of **Trung** and **Bich** (Bích), which took place on **April 9, 2018** in Tĩnh Gia, Thanh Hóa, Vietnam. It is a single-page application built with Ruby on Rails that serves as a wedding invitation, event schedule, photo gallery, and RSVP system.

- **Repository**: `oNguyenNgocTrung/wedding_app` on GitHub
- **Framework**: Ruby on Rails 5.1.4
- **Ruby version**: 2.5.0 (specified in Capfile via rbenv)
- **Database**: PostgreSQL (pg gem v0.20.0)
- **Template engine**: Slim (not ERB for views)
- **Frontend template**: "Glanz" - a premium wedding HTML template, vendored into the project

---

## 2. Architecture & Project Structure

### Rails Application (standard Rails 5.1 layout)

```
app/
├── controllers/
│   ├── application_controller.rb    # CSRF protection
│   ├── homepages_controller.rb      # Root page (single page site)
│   └── customers_controller.rb      # RSVP form submission (AJAX)
├── models/
│   ├── application_record.rb
│   └── customer.rb                  # RSVP guest model (empty, no validations)
├── views/
│   ├── layouts/
│   │   ├── application.html.slim    # Main layout
│   │   └── _header.slim             # Navigation partial
│   ├── homepages/
│   │   └── index.slim               # The entire single-page site
│   └── customers/
│       └── create.js.erb            # AJAX response for RSVP form
├── assets/
│   ├── images/                      # Wedding photos & gallery images
│   ├── javascripts/application.js   # Sprockets manifest
│   └── stylesheets/application.css  # Sprockets manifest
```

### Key directories

- `vendor/assets/template/glanz/` - The "Glanz" wedding HTML template (CSS, JS, fonts, images)
- `config/deploy/` - Capistrano deployment configuration
- `spec/` - RSpec test stubs (essentially empty)
- `test/` - Rails default test directory (unused)

---

## 3. Database Schema

Single table: **customers** (used for RSVP guests)

| Column      | Type     | Notes              |
|-------------|----------|--------------------|
| id          | integer  | Primary key (auto) |
| name        | string   | Guest name         |
| contact     | string   | Email or phone     |
| note        | text     | Personal message   |
| created_at  | datetime | Auto-generated     |
| updated_at  | datetime | Auto-generated     |

- Database: PostgreSQL with `plpgsql` extension
- Migration date: April 5, 2018 (`20180405030852`)
- **No validations** on the Customer model - any data (including blank) is accepted

---

## 4. Routes

Only two routes exist:

```ruby
root "homepages#index"              # GET /  → the entire website
resources :customers, only: :create  # POST /customers → RSVP submission
```

This is a minimal routing setup for a single-page wedding site with one form.

---

## 5. Controllers

### HomepagesController
- Single `index` action
- Initializes a new `Customer` object for the RSVP form (`@customer = Customer.new`)

### CustomersController
- `layout :false` - disables layout rendering (AJAX responses only)
- `create` action: builds a Customer from permitted params (`:name`, `:contact`, `:note`) and saves it
- No error handling beyond what the JS.ERB response provides
- **Note**: The form also has checkbox inputs for `attend` (which events the guest will attend), but these are NOT included in `customer_params` — attendance selections are **silently discarded** and never saved to the database

---

## 6. Frontend / Single-Page Structure

The entire website is rendered in `app/views/homepages/index.slim` and consists of these sections (top to bottom):

### 6.1 Hero Slider
- Full-screen background image (`slider-background.jpg`)
- Dark overlay (opacity 0.6)
- Decorative flower frame with couple's names "Trung" & "Bich"
- Save the Date: "April 09, 2018"
- Scroll-down indicator

### 6.2 Couple Introduction with Countdown Timer
- Circular profile photos of Trung and Bich
- Vietnamese text: "Chúng tôi chuẩn bị cưới vào ngày 9 tháng 4 năm 2018" (We are getting married on April 9, 2018)
- Location: Tĩnh Gia, Thanh Hóa
- JavaScript countdown timer targeting April 9, 2018

### 6.3 About Us Section
- Two alternating rows with photos and descriptions:
  - **Bích**: "Nàng là cô gái miền núi luôn ngây thơ trước mọi hoàn cảnh và chỉ thích ăn thịt" (She is a mountain girl who is always naive and only likes to eat meat)
  - **Trung**: "Chàng trai miền biển, thích ăn kẹo và táo" (A coastal boy who likes candy and apples)
- Social links (Facebook profiles linked)

### 6.4 When & Where (Event Schedule)
Four events listed:

| Event | Date | Location | Contact |
|-------|------|----------|---------|
| Cỗ cưới nhà gái (Bride's reception) | 07/04/2018 10:00AM | Phù Yên, Sơn La | 0961236977 |
| Cỗ cưới nhà trai (Groom's reception) | 08/04/2018 10:00AM | TK1, Tĩnh Gia, Thanh Hóa | 0976418537 |
| Lễ Cưới (Wedding ceremony) | 09/04/2018 08:00AM | TK1, Tĩnh Gia, Thanh Hóa | 0976418537 |
| Lễ Báo Hỷ (Wedding announcement party) | 14/04/2018 17:00 | Trống Đồng Thành Công, HN | 0961236977 |

Each event has a Google Maps link for navigation.

### 6.5 RSVP Section
- Parallax background image
- Form fields: Name, Contact (email/phone), checkboxes for event attendance, personal note
- Form submitted via AJAX (`remote: true`)
- Response uses SweetAlert popup:
  - Success: "Cám ơn!!! Hẹn gặp lại vào ngày cưới mình nhé :P"
  - Error: "Xin lỗi!!! Hình như có lỗi củ chuối gì đó, bạn thử lại nhé"
- After success, form fields are cleared

### 6.6 Photo Gallery
- Filterable photo gallery using Isotope.js
- Categories: Hà Nội, Mộc Châu, Tà Xùa, Ăn Hỏi (engagement), Lễ cưới (ceremony)
- Gallery image sets:
  - `BT_1.jpg` to `BT_8.jpg` (8 images) — tagged as "hanoi"
  - `MC_1.jpg` to `MC_10.jpg` (10 images) — tagged as "moc_chau"
  - `TX_1.jpg` to `TX_10.jpg` (10 images) — tagged as "ta_xua"
- **Note**: "Ăn Hỏi" and "Lễ cưới" filter buttons exist but have no images tagged with those classes
- Lightbox popup (Magnific Popup) for full-size image viewing

### 6.7 Thank You Section
- Parallax background
- Animated "Thank You" GIF

---

## 7. Layout & Navigation

### Application Layout (`application.html.slim`)
- Google Fonts: Dosis, Open Sans, Playfair Display
- Embedded SoundCloud music player (auto-play enabled) — plays a background track
- Music toggle icon (click to show/hide player)
- CSRF meta tags for form security
- Turbolinks enabled

### Header (`_header.slim`)
- Logo: "Trung & Bich" with date "April 09, 2018"
- Navigation menu with 3 items (all anchor links within the same page):
  - Đám cưới (Wedding) → top of page
  - Địa điểm & Thời gian (Location & Time) → #when-where
  - Ảnh cưới (Wedding photos) → #gallery
- Mobile hamburger menu with animated slide-in

---

## 8. Frontend Dependencies (Vendored Glanz Template)

### JavaScript Libraries (bundled in `glanz_library.js`)
- jQuery 1.12.4 (also loaded via jquery-rails gem)
- Bootstrap (JS components)
- OWL Carousel
- Isotope (masonry/filtering layout)
- jQuery Countdown
- Magnific Popup (lightbox)
- Skrollr (parallax scrolling)
- jQuery Stellar (parallax backgrounds)
- ImagesLoaded
- jQuery Appear
- jQuery CountTo
- jQuery Lettering
- Device.js (mobile/tablet detection)
- jQuery One Page Nav
- Instafeed.js (Instagram integration)
- SweetAlert (separate file, `sweetalert.min.js`)

### CSS (bundled in `glanz_library.css.erb` and `glanz_style.css.erb`)
- Bootstrap CSS
- OWL Carousel CSS
- Magnific Popup CSS
- jQuery Countdown CSS
- Custom Glanz theme styling

### Fonts
- Themify Icons (icon font)
- Flaticon (wedding-specific icons)
- Marsha (decorative/script font)

---

## 9. Asset Pipeline Configuration

- Sprockets-based asset pipeline (Rails 5.1 default)
- `application.js` requires: jquery, jquery_ujs, turbolinks, glanz_library, sweetalert.min, glanz_script
- `application.css` requires: glanz_library, themify-icons, glanz_style, marsha font stylesheet
- Additional precompiled assets: `glanz/images/*` and `glanz/fonts/*`
- Node modules path added to asset load path (though `package.json` has no dependencies)

---

## 10. Deployment

### Capistrano Setup
- **Server**: `128.199.149.245` (DigitalOcean-style IP)
- **User**: `deploy`
- **Deploy path**: `/home/deploy/wedding_app`
- **Branch**: master
- **Keeps**: 5 releases
- **Web server**: Passenger (via capistrano-passenger gem)
- **Ruby manager**: rbenv (Ruby 2.5.0)

### Linked Files (shared across releases)
- `config/database.yml`
- `config/secrets.yml`
- `config/application.yml` (Figaro env vars)

### Linked Directories
- `log`, `tmp/pids`, `tmp/cache`, `tmp/sockets`, `vendor/bundle`, `public/system`, `public/uploads`

### Deployment Flow
1. Git pull from GitHub
2. Bundle install
3. Asset precompilation
4. Database migration
5. Restart via `touch tmp/restart.txt` (Passenger restart)

---

## 11. Configuration & Environment

- **Figaro** gem for environment variable management (`config/application.yml`, gitignored)
- **Config** gem for settings (`config/settings.yml` — empty, plus environment-specific files)
- **Secrets**: Development/test keys hardcoded; production uses `ENV["SECRET_KEY_BASE"]`
- Production config: assets precompiled, JS compressed with Uglifier, no asset fallback compilation

---

## 12. Testing

- **RSpec** is set up but essentially unused:
  - `spec/models/customer_spec.rb` — contains only a pending placeholder
  - `spec/factories/customers.rb` — empty factory definition
- **Test gems**: RSpec, FactoryBot, Faker, Shoulda Matchers, DatabaseCleaner, Capybara
- Standard Rails `test/` directory also exists but is unused

---

## 13. Notable Issues & Observations

### Bugs / Missing Features
1. **Attendance checkboxes not saved**: The RSVP form has checkboxes for which events guests will attend, but the `attend` field is not in the database schema nor in `customer_params`. These selections are silently lost.
2. **No model validations**: `Customer` model has zero validations — blank submissions are accepted and saved.
3. **Gallery filter mismatch**: "Ăn Hỏi" and "Lễ cưới" filter buttons exist in the gallery but no images have those CSS classes, so clicking them shows nothing.

### Security Concerns
4. **Secrets committed to git**: `config/secrets.yml` contains development/test secret keys and is tracked in git (though also listed in `.gitignore` — likely added after initial commit).
5. **Hardcoded IP address**: Production server IP is committed in `config/deploy/production.rb`.
6. **Phone numbers exposed**: Personal phone numbers are in the view template.
7. **Facebook profile URLs exposed**: Direct links to personal Facebook profiles.

### Technical Debt
8. **Rails 5.1.4 is outdated**: Released in 2017, well past end-of-life.
9. **Ruby 2.5.0 is outdated**: End-of-life since March 2021.
10. **jQuery 1.12.4**: Very old version with known security vulnerabilities.
11. **Dual test frameworks**: Both RSpec and Minitest directories exist; neither is actually used.
12. **SweetAlert v1**: Uses the original SweetAlert (not SweetAlert2), which is unmaintained.
13. **Vendor template is very heavy**: Large bundled CSS/JS files from the Glanz template.

### Architecture Notes
14. **True single-page app**: Everything is on one page — no additional routes or pages needed.
15. **All content is hardcoded**: No CMS, no admin panel — all wedding details are in the Slim templates.
16. **Vietnamese language**: All user-facing text is in Vietnamese.
17. **SoundCloud auto-play**: Background music plays automatically (likely blocked by modern browsers).
18. **Parallax effects**: Multiple parallax scrolling sections using both Stellar.js and Skrollr.

---

## 14. Gem Dependencies Summary

| Gem | Purpose |
|-----|---------|
| rails ~> 5.1.4 | Web framework |
| pg 0.20.0 | PostgreSQL adapter |
| puma ~> 3.7 | Web server |
| sass-rails ~> 5.0 | SCSS compilation |
| uglifier | JS minification |
| coffee-rails ~> 4.2 | CoffeeScript support (unused) |
| jquery-rails 4.3.1 | jQuery for Rails |
| turbolinks ~> 5 | SPA-like page transitions |
| jbuilder ~> 2.5 | JSON API builder (unused) |
| figaro | Environment variables |
| config | Settings management |
| slim | Template engine |
| capistrano + plugins | Deployment automation |
| pry-rails | Debug console |
| rspec + plugins | Testing (unused) |
| factory_bot_rails | Test factories (unused) |
| rubocop ~> 0.51.0 | Linting (unused) |

---

## 15. Summary

This is a small, purpose-built Rails application that served as a personal wedding invitation website for Trung and Bich's April 2018 wedding in Vietnam. It uses the "Glanz" premium HTML template integrated into the Rails asset pipeline, providing a visually rich single-page experience with parallax scrolling, photo galleries, countdown timers, and background music.

The only dynamic feature is the RSVP form, which saves guest names, contact info, and notes to a PostgreSQL database via AJAX, displaying success/error feedback with SweetAlert popups. The attendance checkbox data is notably not persisted.

The app was deployed to a DigitalOcean server using Capistrano with Passenger and rbenv. The codebase is minimal (~200 lines of custom Ruby code) with the vast majority of complexity residing in the vendored Glanz template's CSS and JavaScript.
