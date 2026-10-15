/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export type ControlledTerm = {
  /** Unique auto-increment integer identifier. */
  id: number;
  blocking?: boolean;
  is_value?: boolean;
  excepted_taxon_ids?: number[];
  label?: string;
  labels?: {
    id?: number;
    definition?: string;
    label?: string;
    locale?: string;
    valid_within_clade?: number | null;
  }[];
  multivalued?: boolean;
  ontology_uri?: string;
  taxon_ids?: number[];
  uri?: string;
  /** @format uuid */
  uuid?: string | null;
  valid_within_clade?: number | null;
  values?: ControlledTerm[];
} | null;

export type Site = {
  /**
   * Unique auto-increment integer identifier.
   * @example 1
   */
  id: number;
  /**
   * URL of an icon image for the site
   * @example "https://static.inaturalist.org/sites/1-logo_square.png"
   */
  icon_url?: string;
  /**
   * Default language code for users of this site
   * @example "en"
   */
  locale?: string | null;
  /**
   * Full name of the site
   * @example "iNaturalist"
   */
  name?: string;
  /** Integer ID of the default search place for this site */
  place_id?: number | null;
  /**
   * Short name for this site
   * @example "iNat"
   */
  site_name_short?: string | null;
  /** @example "https://www.inaturalist.org" */
  url?: string;
} | null;

export type User = {
  /** Unique auto-increment integer identifier. */
  id: number;
  /** @format uuid */
  uuid?: string;
  /** @format date-time */
  created_at?: string;
  description?: string | null;
  /** Ordered list of IDs of projects the user has faved */
  faved_project_ids?: number[];
  icon?: string | null;
  icon_url?: string | null;
  identifications_count?: number;
  journal_posts_count?: number;
  annotated_observations_count?: number;
  /** @format date-time */
  last_active?: string;
  login?: string;
  monthly_supporter?: boolean | null;
  name?: string | null;
  observations_count?: number;
  orcid?: string | null;
  preferences?: {
    /**
     *
     *         Whether the user allows the Community Taxon to be the taxon their observation is associated with
     *
     */
    prefers_community_taxa?: boolean;
    prefers_observation_fields_by?: "anyone" | "curators" | "observer";
    prefers_project_addition_by?: "any" | "joined" | "none";
  };
  roles?: string[];
  site?: Site;
  site_id?: number | null;
  spam?: boolean;
  species_count?: number;
  suspended?: boolean;
  /** @format date-time */
  updated_at?: string;
} | null;

export interface Vote {
  /** Unique auto-increment integer identifier. */
  id?: number;
  created_at?: string;
  user?: User;
  user_id?: number;
  vote_flag?: boolean;
  vote_scope?: string | null;
}

export interface Annotation {
  concatenated_attr_val?: string;
  controlled_attribute?: ControlledTerm;
  controlled_attribute_id?: number;
  controlled_value?: ControlledTerm;
  controlled_value_id?: number;
  user?: User;
  user_id?: number;
  /** @format uuid */
  uuid: string;
  vote_score?: number;
  votes?: Vote[];
}

export interface Announcement {
  id: number;
  body?: string;
  placement?: string;
  clients?: string[];
  dismissible?: boolean;
  locales?: string[];
  /** @format date-time */
  start?: string;
  /** @format date-time */
  end?: string;
}

export interface AppBuildInfo {
  rails?: {
    git_branch?: string;
    git_commit?: string;
    image_tag?: string;
    build_date?: string;
  };
  api?: {
    git_branch?: string;
    git_commit?: string;
    image_tag?: string;
    build_date?: string;
  };
  vision?: {
    git_branch?: string;
    git_commit?: string;
    image_tag?: string;
    build_date?: string;
  };
}

export interface AuthorizedApplication {
  application: {
    id: number;
    /** @example "iNaturalist iPhone App" */
    name?: string;
    /** Whether this application is controlled by iNaturalist itself */
    official?: boolean;
  };
  /** @format date-time */
  created_at?: string;
  /** List of scopes granted to this application. `login` provides access to information required for logging into a third-party service like user ID, email address, profile pic, etc. `write` allows the application to post content to iNat as the user; `account_delete` allows the application to delete the user's iNat account. */
  scopes?: ("login" | "write" | "account_delete")[];
}

export interface BuildInfo {
  git_branch?: string;
  git_commit?: string;
  image_tag?: string;
  build_date?: string;
}

export type DateDetails = {
  date: string;
  day: number;
  hour: number;
  month: number;
  week: number;
  year: number;
} | null;

export interface Flag {
  /** Unique auto-increment integer identifier. */
  id: number;
  comment?: string | null;
  /** @format date-time */
  created_at?: string;
  /** @format date-time */
  created_at_utc?: string | null;
  flag?: string;
  flaggable_content?: string | null;
  flaggable_id?: number | null;
  flaggable_type?: string | null;
  flaggable_user_id?: number | null;
  resolved?: boolean;
  resolver_id?: number | null;
  /** @format date-time */
  resolved_at?: string | null;
  /** @format date-time */
  updated_at?: string | null;
  /** @format date-time */
  updated_at_utc?: string | null;
  user?: User;
  user_id?: number;
  /** @format uuid */
  uuid?: string | null;
}

export interface ModeratorAction {
  /** Unique auto-increment integer identifier. */
  id: number;
  created_at?: string;
  created_at_details?: DateDetails;
  user?: User;
  action?: string;
  reason?: string;
  private?: boolean;
}

export interface Comment {
  /** Unique auto-increment integer identifier. */
  id?: number;
  body?: string;
  /** @format date-time */
  created_at?: string;
  created_at_details?: DateDetails;
  /** @format date-time */
  created_at_utc?: string;
  flags?: Flag[];
  hidden?: boolean;
  html?: string;
  moderator_actions?: ModeratorAction[];
  parent_id?: number | null;
  parent_type?: string | null;
  user?: User;
  user_id?: number | null;
  /** @format date-time */
  updated_at?: string;
  /** @format date-time */
  updated_at_details?: string;
  /** @format uuid */
  uuid: string;
}

export type Taxon = {
  /** Unique auto-increment integer identifier. */
  id: number;
  /** @format uuid */
  uuid?: string;
  ancestors?: Taxon[];
  ancestor_ids?: number[];
  ancestry?: string | null;
  atlas_id?: number | null;
  children?: Taxon[];
  complete_rank?: string;
  complete_species_count?: number | null;
  conservation_status?: ConservationStatus;
  conservation_statuses?: ConservationStatus[];
  created_at?: string;
  current_synonymous_taxon_ids?: number[] | null;
  default_photo?: Photo;
  endemic?: boolean;
  english_common_name?: string;
  establishment_means?: {
    establishment_means?: string;
    id?: number;
    place?: {
      id?: number;
      name?: string;
      display_name?: string;
      ancestry?: string | null;
    };
  };
  preferred_establishment_means?: string;
  extinct?: boolean;
  provisional?: boolean;
  flag_counts?: {
    resolved?: number;
    unresolved?: number;
  };
  iconic_taxon_id?: number | null;
  iconic_taxon_name?: string | null;
  introduced?: boolean;
  is_active?: boolean;
  listed_taxa?: {
    id?: number;
    establishment_means?: string;
    list?: List;
    taxon?: Taxon;
    taxon_id?: number;
    place?: Place;
  }[];
  listed_taxa_count?: number;
  matched_term?: string;
  min_species_ancestry?: string;
  min_species_taxon_id?: number;
  name?: string;
  native?: boolean;
  observations_count?: number;
  parent_id?: number | null;
  /** Whether or not photos for this taxon can be edited */
  photos_locked?: boolean;
  preferred_common_name?: string | null;
  preferred_common_names?: any[] | null;
  rank?: string;
  /** @format float */
  rank_level?: number;
  representative_photo?: Photo;
  statuses?: any[];
  taxon_changes_count?: number;
  taxon_photos?: {
    taxon?: Taxon;
    taxon_id?: number;
    photo?: Photo;
  }[];
  taxon_schemes_count?: number;
  threatened?: boolean;
  universal_search_rank?: number;
  vision?: boolean;
  wikipedia_summary?: string | null;
  wikipedia_url?: string | null;
} | null;

export type ConservationStatus = {
  id: number;
  authority?: string | null;
  description?: string | null;
  geoprivacy?: string | null;
  iucn?: number;
  iucn_status?: string;
  iucn_status_code?: string;
  place?: {
    id?: number;
    name?: string;
    display_name?: string;
    ancestry?: string | null;
  } | null;
  place_id?: number | null;
  source_id?: number | null;
  status?: string;
  status_name?: string;
  taxon_id?: number;
  user_id?: number | null;
  url?: string | null;
} | null;

export type Photo = {
  /** Unique auto-increment integer identifier. */
  id: number;
  attribution?: string;
  attribution_name?: string | null;
  flags?: Flag[];
  hidden?: boolean;
  large_url?: string | null;
  license_code?: string | null;
  medium_url?: string | null;
  moderator_actions?: ModeratorAction[];
  native_page_url?: string | null;
  native_photo_id?: string | null;
  original_dimensions?: {
    height?: number | null;
    width?: number | null;
  } | null;
  original_url?: string | null;
  small_url?: string | null;
  square_url?: string | null;
  type?: string;
  url?: string | null;
  original_filename?: string | null;
} | null;

export type List = {
  /** Unique auto-increment integer identifier. */
  id: number;
  title?: string | null;
} | null;

export type PolygonGeoJson = {
  type: string;
  coordinates: number[][][][] | number[][][];
} | null;

export type PointGeoJson = {
  /**
   * @maxItems 2
   * @minItems 2
   */
  coordinates: number[];
  type: string;
} | null;

export type Place = {
  /** Unique auto-increment integer identifier. */
  id: number;
  admin_level?: number | null;
  ancestor_place_ids?: number[] | null;
  /** @format float */
  bbox_area?: number | null;
  bounding_box_geojson?: PolygonGeoJson;
  display_name?: string | null;
  display_name_autocomplete?: string | null;
  geometry_geojson?: PolygonGeoJson;
  location?: string | null;
  matched_term?: string | null;
  name?: string;
  observations_count?: number;
  place_type?: number | null;
  point_geojson?: PointGeoJson;
  slug?: string | null;
  universal_search_rank?: number | null;
  user?: User;
  /** @format uuid */
  uuid?: string;
  without_check_list?: boolean | null;
} | null;

/**
 *  Common ancestor taxon of some of the top results weighted by combined score.
 *   If present, it generally has a much higher chance of being accurate (if not
 *   precise), often by as much as 30-40 percentage points.
 */
export interface CommonAncestor {
  /**
   *  Common ancestor scores are not directly comparable to the combined_score
   *     of results. Generally they are similar, factoring in both vision and spatial
   *     similarity, but are derived from a subset of the top results resulting in
   *     a value different than combined_score. Usually the common ancestor score
   *     will be above 70 as taxa need to have a high confidence in order to be
   *     considered a likely common ancestor.
   *
   * @format float
   * @min 0
   * @max 100
   */
  score?: number;
  taxon: Taxon;
}

export interface Error {
  /** Unique auto-increment integer identifier. */
  status?: string;
  errors?: {
    errorCode?: string;
    message?: string;
    from?: string | null;
    stack?: string | null;
  }[];
}

export interface ExemplarIdentificationIdentification {
  /** Unique auto-increment integer identifier. */
  id: number;
  body?: string | null;
  category?: string | null;
  /** @format date-time */
  created_at?: string;
  created_at_details?: DateDetails;
  current?: boolean;
  disagreement?: boolean | null;
  exemplar_identification?: {
    /** Unique auto-increment integer identifier. */
    id: number;
    nominated_by_user?: {
      id?: number;
      login?: string;
      name?: string | null;
      icon?: string | null;
    } | null;
    nominated_at?: string | null;
    votes?: Vote[];
    cached_votes_total?: number;
  } | null;
  flags?: Flag[];
  hidden?: boolean;
  moderator_actions?: ModeratorAction[];
  observation_id?: number;
  own_observation?: boolean;
  previous_observation_taxon_id?: number | null;
  previous_observation_taxon?: Taxon;
  spam?: boolean;
  taxon?: Taxon;
  taxon_change?: {
    id: number;
    type: string;
  } | null;
  taxon_change_id?: number | null;
  taxon_change_type?: string | null;
  taxon_id?: number;
  /** @format date-time */
  updated_at?: string;
  user?: User;
  user_id?: number;
  /** @format uuid */
  uuid?: string;
  vision?: boolean;
  observation?: {
    id?: number;
    discussion_count?: number;
    annotations?: Annotation[];
    photos?: Photo[];
  };
}

export type ExemplarIdentification = {
  /** Unique auto-increment integer identifier. */
  id: number;
  identification?: ExemplarIdentificationIdentification;
  nominated_by_user?: {
    id?: number;
    login?: string;
    name?: string | null;
    icon?: string | null;
  } | null;
  nominated_at?: string | null;
  votes?: Vote[];
  cached_votes_total?: number;
} | null;

export interface IdSummaryReference {
  /** Unique auto-increment integer identifier for the reference. */
  id: number;
  /** Parent IdSummary ID. */
  id_summary_id: number;
  /** External UUID for the referenced object (e.g. identification or comment), if available. */
  reference_uuid?: string | null;
  /** Origin of the reference, e.g. 'observation' or 'identification'. */
  reference_source?: string | null;
  /** Observation ID associated with the reference, if any. */
  reference_observation_id?: number | null;
  /**
   * When the referenced content was created, if known.
   * @format date-time
   */
  reference_date?: string | null;
  /** Captured text from the referenced content (e.g. a comment body). */
  reference_content?: string | null;
  /** User ID associated with the reference, if any. */
  user_id?: number | null;
  /** User login associated with the reference, if any. */
  user_login?: string | null;
  /**
   * Record creation time (UTC).
   * @format date-time
   */
  created_at?: string | null;
  /**
   * Last update time (UTC).
   * @format date-time
   */
  updated_at?: string | null;
}

export interface IdSummary {
  /** Unique auto-increment integer identifier for the IdSummary. */
  id: number;
  /** Parent TaxonIdSummary ID. */
  taxon_id_summary_id: number;
  /** Short human-readable identification summary text. */
  summary?: string | null;
  /** Plain-language tip describing what to photograph to capture key ID features. */
  photo_tip?: string | null;
  /** Grouping label for the summary (e.g. 'Coloration', 'Shape'). */
  visual_key_group?: string | null;
  /**
   * Overall score for the summary, if available.
   * @format float
   */
  score?: number | null;
  /**
   * Record creation time (UTC).
   * @format date-time
   */
  created_at?: string | null;
  /**
   * Last update time (UTC).
   * @format date-time
   */
  updated_at?: string | null;
  /**
   * References (observations, identifications, comments, etc.) that support this summary.
   * @default []
   */
  references?: IdSummaryReference[];
}

export interface Identification {
  /** Unique auto-increment integer identifier. */
  id: number;
  body?: string | null;
  category?: string | null;
  /** @format date-time */
  created_at?: string;
  created_at_details?: DateDetails;
  current?: boolean;
  disagreement?: boolean | null;
  exemplar_identification?: {
    /** Unique auto-increment integer identifier. */
    id: number;
    nominated_by_user?: {
      id?: number;
      login?: string;
      name?: string | null;
      icon?: string | null;
    } | null;
    nominated_at?: string | null;
    votes?: Vote[];
    cached_votes_total?: number;
  } | null;
  flags?: Flag[];
  hidden?: boolean;
  moderator_actions?: ModeratorAction[];
  observation_id?: number;
  own_observation?: boolean;
  previous_observation_taxon_id?: number | null;
  previous_observation_taxon?: Taxon;
  spam?: boolean;
  taxon?: Taxon;
  taxon_change?: {
    id: number;
    type: string;
  } | null;
  taxon_change_id?: number | null;
  taxon_change_type?: string | null;
  taxon_id?: number;
  /** @format date-time */
  updated_at?: string;
  user?: User;
  user_id?: number;
  /** @format uuid */
  uuid?: string;
  vision?: boolean;
}

export type ListedTaxon = {
  description?: string | null;
  place?: Place;
  /** Unique auto-increment integer identifier. */
  id: number;
  created_at?: string;
  updated_at?: string;
  comments_count?: number;
  /** Assessment of occurrence frequency in this place. 60 = present, 50 = common, 40 = uncommon, 30 = irregular, 20 = doubtful, 10 = absent */
  occurrence_status_level?: number | null;
  /** How this taxon became established in this place */
  establishment_means?: "native" | "endemic" | "introduced";
  observations_count?: number;
  /** Whether this taxon was added to this list by a person or not */
  manually_added?: boolean | null;
  /** Whether or not this is the primary listing for this taxon in this place (places can have multiple checklists that contain the same taxa) */
  primary_listing?: boolean;
  /** Localized version of the establishment means */
  establishment_means_label?: string;
  /** Localized description of the establishment means */
  establishment_means_description?: string;
} | null;

export interface Message {
  /** Unique auto-increment integer identifier. */
  id: number;
  user_id?: number;
  thread_id?: number;
  subject?: string;
  body?: string;
  /** @format date-time */
  read_at?: string;
  /** @format date-time */
  created_at?: string;
  /** @format date-time */
  updated_at?: string;
  comments_count?: number;
  from_user?: User;
  to_user?: User;
}

export interface ObservationField {
  /** Unique auto-increment integer identifier. */
  id: number;
  allowed_values?: string | null;
  datatype?: string;
  description?: string | null;
  description_autocomplete?: string | null;
  name?: string;
  name_autocomplete?: string;
  users_count?: number | null;
  /** @format uuid */
  uuid?: string;
  values_count?: number | null;
}

export type Project = {
  /** Unique auto-increment integer identifier. */
  id: number;
  admins?: {
    id?: number;
    project_id?: number;
    role?: string;
    user?: User;
    user_id?: number;
  }[];
  banner_color?: string | null;
  created_at?: string;
  delegated_project_id?: number | null;
  description?: string | null;
  flags?: Flag[];
  header_image_contain?: boolean;
  header_image_file_name?: string | null;
  header_image_url?: string | null;
  hide_leaderboard?: boolean;
  hide_title?: boolean;
  hide_umbrella_map_flags?: boolean;
  icon?: string | null;
  icon_file_name?: string | null;
  is_delegated_umbrella?: boolean | null;
  is_umbrella?: boolean;
  latitude?: string;
  location?: string | null;
  longitude?: string;
  membership_model?: string | null;
  /** @format date-time */
  observation_requirements_updated_at?: string | null;
  place_id?: number | null;
  prefers_user_trust?: boolean | null;
  project_observation_fields?: {
    id: number;
    observation_field?: ObservationField;
    position?: number;
    required?: boolean | null;
  }[];
  project_observation_rules?: {
    id: number;
    operand_id?: number | null;
    operand_type?: string | null;
    operator?: string;
    place?: Place;
    project?: Project;
    taxon?: Taxon;
    user?: User;
  }[];
  project_type?: string | null;
  rule_preferences?: {
    /** Observation attribute this rule assesses */
    field?: string;
    /** Required observation attribute value(s) */
    value?: any;
  }[];
  search_parameters?: {
    field?: string;
    /** TODO: values can be single values or arrays */
    value?: any;
    value_bool?: boolean;
    value_date?: string[];
    /** TODO: values can be single values or arrays */
    value_keyword?: any;
    value_number?: number | number[];
  }[];
  /** TODO: fix this */
  site_features?:
    | {
        noteworthy?: boolean;
        site_id?: number;
        /** @format date-time */
        featured_at?: string;
      }[]
    | null;
  slug?: string;
  terms?: string | null;
  title?: string;
  updated_at?: string;
  user?: User;
  user_id?: number;
  user_ids?: number[];
  umbrella_project_list_sort?: string | null;
} | null;

export interface ObservationPhoto {
  /** Unique auto-increment integer identifier. */
  id: number;
  photo?: Photo;
  position?: number | null;
  /** @format uuid */
  uuid?: string;
}

export type Sound = {
  attribution?: string;
  file_content_type?: string | null;
  file_url?: string | null;
  flags?: Flag[];
  hidden?: boolean;
  /** Unique auto-increment integer identifier. */
  id: number;
  license_code?: string | null;
  moderator_actions?: ModeratorAction[];
  native_sound_id?: string | null;
  original_filename?: string | null;
} | null;

export interface ObservationSound {
  /** Unique auto-increment integer identifier. */
  id: number;
  sound?: Sound;
  position?: number;
  /** @format uuid */
  uuid?: string;
}

export interface ObservationFieldValue {
  /** Unique auto-increment integer identifier. */
  id?: number;
  datatype?: string;
  field_id?: number;
  name?: string;
  name_ci?: string;
  observation_field?: ObservationField;
  taxon?: Taxon;
  taxon_id?: string;
  user?: User;
  user_id?: number;
  /** @format uuid */
  uuid?: string;
  value?: string;
  value_ci?: string;
}

export interface ProjectUser {
  /** Unique auto-increment integer identifier. */
  id: number;
  observations_count?: number;
  prefers_curator_coordinate_access_for?: string;
  project_id?: number;
  role?: string | null;
  taxa_count?: number;
  user_id?: number;
  /** @format date-time */
  created_at?: string;
  /** @format date-time */
  created_at_utc?: string;
  /** @format date-time */
  updated_at?: string;
  /** @format date-time */
  updated_at_utc?: string;
}

export interface ProjectObservation {
  /** Unique auto-increment integer identifier. */
  id: number;
  current_user_is_member?: boolean;
  preferences?: {
    allows_curator_coordinate_access?: boolean;
  };
  project?: Project;
  project_id?: number;
  project_user?: ProjectUser;
  user?: User;
  user_id?: number | null;
  /** @format uuid */
  uuid: string;
}

export interface QualityMetric {
  /** Unique auto-increment integer identifier. */
  id: number;
  agree?: boolean;
  metric?: string;
  user?: User;
  user_id?: number | null;
}

export interface Observation {
  /** Unique auto-increment integer identifier. */
  id?: number | null;
  annotations?: Annotation[];
  application?: {
    id: number;
    icon?: string | null;
    name?: string;
    url?: string;
  };
  cached_votes_total?: number;
  captive?: boolean;
  comments?: Comment[];
  comments_count?: number;
  community_taxon?: Taxon;
  community_taxon_id?: number | null;
  context_geoprivacy?: string | null;
  context_taxon_geoprivacy?: string | null;
  context_user_geoprivacy?: string | null;
  created_at?: string;
  created_at_details?: DateDetails;
  created_time_zone?: string;
  description?: string | null;
  faves?: Vote[];
  faves_count?: number;
  flags?: Flag[];
  geojson?: PointGeoJson;
  geoprivacy?: string | null;
  id_please?: boolean;
  ident_taxon_ids?: number[];
  identifications?: Identification[];
  identifications_count?: number;
  identifications_most_agree?: boolean;
  identifications_most_disagree?: boolean;
  identifications_some_agree?: boolean;
  license_code?: string | null;
  location?: string | null;
  map_scale?: number | null;
  mappable?: boolean;
  non_owner_ids?: Identification[];
  non_traditional_projects?: {
    current_user_is_member?: boolean;
    project?: Project;
    projectUser?: {
      role?: string;
      prefers_curator_coordinate_access_for?: string;
    };
  }[];
  num_identification_agreements?: number;
  num_identification_disagreements?: number;
  oauth_application_id?: number | null;
  obscured?: boolean;
  observation_photos?: ObservationPhoto[];
  observation_sounds?: ObservationSound[];
  observed_on?: string | null;
  observed_on_details?: DateDetails;
  observed_on_string?: string | null;
  observed_time_zone?: string | null;
  ofvs?: ObservationFieldValue[];
  out_of_range?: boolean | null;
  outlinks?: {
    source?: string;
    url?: string;
  }[];
  owners_identification_from_vision?: boolean | null;
  photos?: Photo[];
  place_guess?: string | null;
  place_ids?: number[];
  positional_accuracy?: number | null;
  preferences?: {
    auto_obscuration?: boolean;
    prefers_community_taxon?: boolean | null;
  };
  private_geojson?: PointGeoJson;
  private_location?: string | null;
  private_place_guess?: string | null;
  project_ids?: number[];
  project_ids_with_curator_id?: number[];
  project_ids_without_curator_id?: number[];
  project_observations?: ProjectObservation[];
  public_positional_accuracy?: number | null;
  quality_grade?: string;
  quality_metrics?: QualityMetric[];
  reviewed_by?: number[];
  site_id?: number | null;
  sounds?: Sound[];
  spam?: boolean;
  species_guess?: string | null;
  tags?: string[];
  taxon?: Taxon;
  taxon_geoprivacy?: string | null;
  time_observed_at?: string | null;
  time_zone_offset?: string;
  updated_at?: string;
  uri?: string;
  user?: User;
  /** @format uuid */
  uuid: string;
  /** Observer trusts the authenticated user with access to hidden coordinates */
  viewer_trusted_by_observer?: boolean | null;
  votes?: Vote[];
}

export interface Post {
  id: number;
  parent_id?: number;
  parent_type?: "Project" | "Site" | "User";
  /** @format date-time */
  published_at?: string;
  title?: string;
  body?: string;
  /** @format date-time */
  created_at?: string;
  /** @format date-time */
  updated_at?: string;
  type?: string | null;
  /** @format date-time */
  start_time?: string | null;
  /** @format date-time */
  stop_time?: string | null;
  place_id?: number | null;
  /** @format float */
  latitude?: number | null;
  /** @format float */
  longitude?: number | null;
  /** @format float */
  radius?: number | null;
  /** @format float */
  distance?: number | null;
  /** @format uuid */
  uuid?: string | null;
  user?: User;
}

export interface TaxonNamePriority {
  id: number;
  user_id: number;
  place_id?: number | null;
  place?: {
    id: number;
    /** @format uuid */
    uuid?: string;
    display_name?: string | null;
    name?: string;
  };
  lexicon: string | null;
  position: number | null;
}

export type PrivateUser = {
  /** Unique auto-increment integer identifier. */
  id: number;
  /** @format uuid */
  uuid?: string;
  /** @format date-time */
  created_at?: string;
  description?: string | null;
  /** Ordered list of IDs of projects the user has faved */
  faved_project_ids?: number[];
  icon?: string | null;
  icon_url?: string | null;
  identifications_count?: number;
  journal_posts_count?: number;
  annotated_observations_count?: number;
  /** @format date-time */
  last_active?: string;
  monthly_supporter?: boolean | null;
  name?: string | null;
  observations_count?: number;
  orcid?: string | null;
  roles?: string[];
  site?: Site;
  site_id?: number | null;
  spam?: boolean;
  species_count?: number;
  suspended?: boolean;
  /** @format date-time */
  updated_at?: string;
  activity_count?: number;
  blocked_user_ids?: number[] | null;
  /** @format date-time */
  confirmed_at?: string | null;
  /** @format date-time */
  confirmation_sent_at?: string | null;
  data_transfer_consent?: boolean | null;
  email?: string | null;
  locale?: string | null;
  login?: string;
  muted_user_ids?: number[] | null;
  pi_consent?: boolean | null;
  place_id?: number | null;
  preferences?: {
    prefers_community_taxa?: boolean;
    /** Allows this kind of user to add observation field values to their observations */
    prefers_observation_fields_by?: string;
    /** Allows this kind of user to add their observations to projects */
    prefers_project_addition_by?: string;
    /** Prefers to view common names */
    prefers_common_names?: boolean;
    /** Prefers to view scientific names before common names */
    prefers_scientific_name_first?: boolean;
  };
  preferred_observation_fields_by?: string | null;
  preferred_observation_license?: string | null;
  preferred_photo_license?: string | null;
  preferred_project_addition_by?: string | null;
  preferred_sound_license?: string | null;
  prefers_automatic_taxonomic_changes?: boolean | null;
  prefers_comment_email_notification?: boolean | null;
  prefers_common_names?: boolean | null;
  prefers_community_taxa?: boolean | null;
  prefers_identification_email_notification?: boolean | null;
  prefers_infraspecies_identification_notifications?: boolean | null;
  prefers_mention_email_notification?: boolean | null;
  prefers_message_email_notification?: boolean | null;
  prefers_monthly_supporter_badge?: boolean | null;
  prefers_no_email?: boolean | null;
  prefers_no_tracking?: boolean | null;
  prefers_non_disagreeing_identification_notifications?: boolean | null;
  prefers_project_added_your_observation_email_notification?: boolean | null;
  prefers_project_curator_change_email_notification?: boolean | null;
  prefers_project_journal_post_email_notification?: boolean | null;
  prefers_receive_mentions?: boolean | null;
  prefers_redundant_identification_notifications?: boolean | null;
  prefers_scientific_name_first?: boolean | null;
  prefers_taxon_change_email_notification?: boolean | null;
  prefers_taxon_or_place_observation_email_notification?: boolean | null;
  prefers_user_observation_email_notification?: boolean | null;
  privileges?: string[] | null;
  search_place_id?: number | null;
  taxon_name_priorities?: TaxonNamePriority[];
  time_zone?: string | null;
  unconfirmed_email?: string | null;
  universal_search_rank?: number;
} | null;

export interface ProjectMembership {
  /** Unique auto-increment integer identifier. */
  id: number;
  project_id?: number;
  role?: string | null;
  /** @format date-time */
  created_at?: string;
  /** @format date-time */
  updated_at?: string;
  prefers_curator_coordinate_access_for?: string | null;
  prefers_updates?: boolean | null;
}

export interface ProviderAuthorization {
  /** @format date-time */
  created_at?: string;
  id: number;
  /**
   * Name of the provider from a controlled vocabulary. The `open_id` means Yahoo in this context
   * @example "google_oauth2"
   */
  provider_name?:
    | "apple"
    | "facebook"
    | "flickr"
    | "google_oauth2"
    | "open_id"
    | "orcid"
    | "soundcloud"
    | "twitter";
  /** Unique identifier for the user from the provider */
  provider_uid?: string | null;
  /**
   * Comma-separated list of OAuth scopes granted by the provider
   * @example "email,user_photos"
   */
  scope?: string | null;
  /** @format date-time */
  updated_at?: string;
  user_id?: number;
}

export interface Relationship {
  /** Unique auto-increment integer identifier. */
  id: number;
  /** @format date-time */
  created_at?: string;
  /** @format date-time */
  updated_at?: string;
  user?: User;
  friend_user?: User;
  /** Whether the user notifications about new content made by the friend */
  following?: boolean;
  /** Whether the user trusts the friend with hidden coordinates */
  trust?: boolean;
  /** Whether the friend trusts the user with hidden coordinates */
  reciprocal_trust?: boolean;
}

export interface ResultsAnnotations {
  total_results: number;
  page: number;
  per_page: number;
  results: Annotation[];
}

export interface ResultsAnnouncements {
  total_results: number;
  page: number;
  per_page: number;
  results: Announcement[];
}

export interface ResultsAuthorizedApplications {
  total_results: number;
  page: number;
  per_page: number;
  results: AuthorizedApplication[];
}

export interface ResultsComments {
  total_results: number;
  page: number;
  per_page: number;
  results: Comment[];
}

export interface ResultsControlledTerms {
  total_results: number;
  page: number;
  per_page: number;
  results: ControlledTerm[];
}

export interface ResultsEmailAvailable {
  available?: boolean;
}

export interface ResultsExemplarIdentifications {
  total_results: number;
  page: number;
  per_page: number;
  results: ExemplarIdentification[];
  category_counts?: {
    upvoted?: number;
    no_votes?: number;
    downvoted?: number;
    not_nominated?: number;
  };
  category_controlled_terms?: {
    count: number;
    controlled_attribute?: {
      id: number;
      label?: string;
    };
    controlled_value?: {
      id: number;
      label?: string;
    };
  }[];
}

export interface ResultsFlags {
  total_results: number;
  page: number;
  per_page: number;
  results: Flag[];
}

export interface ResultsGeoipLookup {
  total_results: number;
  page: number;
  per_page: number;
  results: {
    ip: string;
    range?: string | number[];
    country?: string;
    region?: string;
    eu?: string;
    timezone?: string;
    city?: string;
    ll?: number[];
    metro?: number;
    area?: number;
  }[];
}

export interface ResultsIdentifications {
  total_results: number;
  page: number;
  per_page: number;
  results: Identification[];
}

export interface ResultsIdentificationsRecentTaxa {
  total_results: number;
  page: number;
  per_page: number;
  all_results_available?: boolean;
  results: {
    taxon: Taxon;
    identification: Identification;
  }[];
}

export interface ResultsIdentifiers {
  total_results: number;
  page: number;
  per_page: number;
  results: {
    user_id?: number;
    count: number;
    user: User;
  }[];
}

export interface ResultsMessages {
  total_results: number;
  page: number;
  per_page: number;
  results: Message[];
}

export interface ResultsMessagesThread {
  total_results: number;
  page: number;
  per_page: number;
  results: Message[];
  thread_id?: number;
  flaggable_message_id?: number;
  reply_to_user?: User;
}

export interface ResultsModelPosts {
  total_results: number;
  page: number;
  per_page: number;
  results: {
    id: number;
    parent_id?: number;
    parent_type?: "Project" | "Site" | "User";
    /** @format date-time */
    published_at?: string;
    title?: string;
    body?: string;
    /** @format date-time */
    created_at?: string;
    /** @format date-time */
    updated_at?: string;
    type?: string | null;
    /** @format date-time */
    start_time?: string | null;
    /** @format date-time */
    stop_time?: string | null;
    place_id?: number | null;
    /** @format float */
    latitude?: number | null;
    /** @format float */
    longitude?: number | null;
    /** @format float */
    radius?: number | null;
    /** @format float */
    distance?: number | null;
    /** @format uuid */
    uuid?: string | null;
    user?: User;
  }[];
}

export interface ResultsObservationFieldValues {
  total_results: number;
  page: number;
  per_page: number;
  results: ObservationFieldValue[];
}

export interface ResultsObservationFields {
  total_results: number;
  page: number;
  per_page: number;
  results: ObservationField[];
}

export interface ResultsObservationPhotos {
  total_results: number;
  page: number;
  per_page: number;
  results: ObservationPhoto[];
}

export interface ResultsObservationSounds {
  total_results: number;
  page: number;
  per_page: number;
  results: ObservationSound[];
}

export interface ResultsObservations {
  total_results: number;
  total_bounds?: {
    /** @format float */
    swlat?: number;
    /** @format float */
    swlng?: number;
    /** @format float */
    nelat?: number;
    /** @format float */
    nelng?: number;
  };
  page: number;
  per_page: number;
  results: Observation[];
}

export interface ResultsObservationsDeleted {
  total_results: number;
  page: number;
  per_page: number;
  results: number[];
}

export interface ResultsObservationsHistogram {
  total_results: number;
  page: number;
  per_page: number;
  results: {
    year?: Record<string, number>;
    month?: Record<string, number>;
    week?: Record<string, number>;
    day?: Record<string, number>;
    hour?: Record<string, number>;
    month_of_year?: Record<string, number>;
    week_of_year?: Record<string, number>;
  };
}

export interface ResultsObservationsIconicTaxaCounts {
  total_results: number;
  page: number;
  per_page: number;
  results: {
    count: number;
    taxon: Taxon;
  }[];
}

export interface ResultsObservationsIdentificationCategories {
  total_results: number;
  page: number;
  per_page: number;
  results: {
    category: string;
    count: number;
  }[];
}

export interface ResultsObservationsIdentifiers {
  total_results: number;
  page: number;
  per_page: number;
  results: {
    count: number;
    user: User;
  }[];
}

export interface ResultsObservationsObservers {
  total_results: number;
  page: number;
  per_page: number;
  results: {
    observation_count: number;
    species_count: number;
    user: User;
  }[];
}

export interface ResultsObservationsPopularFieldValues {
  total_results: number;
  page: number;
  per_page: number;
  results: {
    count: number;
    week_of_year?: any;
    month_of_year?: any;
    controlled_attribute?: {
      id?: number;
      ontology_uri?: string;
      uri?: string;
      is_value?: boolean;
      multivalued?: boolean;
      values?: {
        id?: number;
        ontology_uri?: string;
        uri?: string;
        blocking?: boolean;
        taxon_ids?: number[];
        label?: string;
      }[];
      taxon_ids?: number[];
      excepted_taxon_ids?: number[];
      label?: string;
    };
    controlled_value?: {
      id?: number;
      ontology_uri?: string;
      uri?: string;
      is_value?: boolean;
      blocking?: boolean;
      taxon_ids?: number[];
      label?: string;
      values?: any[];
    };
  }[];
  unannotated?: Record<
    string,
    | {
        count?: number;
        month_of_year?: Record<string, number>;
      }
    | {
        count?: number;
        week_of_year?: Record<string, number>;
      }
  >;
}

export interface ResultsObservationsQualityGrades {
  total_results: number;
  page: number;
  per_page: number;
  results: {
    quality_grade: string;
    count: number;
  }[];
}

export interface ResultsObservationsSpeciesCounts {
  total_results: number;
  page: number;
  per_page: number;
  results: {
    count: number;
    taxon: Taxon;
  }[];
}

export interface ResultsObservationsTaxa {
  total_results: number;
  page: number;
  per_page: number;
  results: {
    taxon_id: number;
    count: number;
  }[];
}

export interface ResultsObservationsTaxonomy {
  total_results: number;
  page: number;
  per_page: number;
  count_without_taxon: number;
  results: {
    id: number;
    name?: string;
    rank?: string;
    /** @format float */
    rank_level?: number;
    is_active?: boolean;
    iconic_taxon_name?: string | null;
    parent_id?: number | null;
    descendant_obs_count?: number;
    direct_obs_count?: number;
  }[];
}

export interface ResultsObservationsUmbrellaProjectStats {
  total_results: number;
  page: number;
  per_page: number;
  results: {
    observation_count: number;
    species_count: number;
    observers_count: number;
    project: Project;
  }[];
}

export interface ResultsPhotos {
  total_results: number;
  page: number;
  per_page: number;
  results: Photo[];
}

export interface ResultsPlaces {
  total_results: number;
  page: number;
  per_page: number;
  results: Place[];
}

export interface ResultsPlacesNearby {
  total_results: number;
  page: number;
  per_page: number;
  results: {
    standard?: Place[];
    community?: Place[];
  };
}

export interface ResultsPosts {
  total_results: number;
  page: number;
  per_page: number;
  results: {
    id: number;
    parent_id?: number;
    parent_type?: "Project" | "Site" | "User";
    /** @format date-time */
    published_at?: string;
    title?: string;
    body?: string;
    /** @format date-time */
    created_at?: string;
    /** @format date-time */
    updated_at?: string;
    type?: string | null;
    /** @format date-time */
    start_time?: string | null;
    /** @format date-time */
    stop_time?: string | null;
    place_id?: number | null;
    /** @format float */
    latitude?: number | null;
    /** @format float */
    longitude?: number | null;
    /** @format float */
    radius?: number | null;
    /** @format float */
    distance?: number | null;
    /** @format uuid */
    uuid?: string | null;
    user?: User;
    parent?: {
      id: number;
      name?: string | null;
      title?: string | null;
      icon_url?: string | null;
    };
  }[];
}

export interface ResultsProjectMembership {
  total_results: number;
  page: number;
  per_page: number;
  results: ProjectMembership[];
}

export interface ResultsProjectObservations {
  total_results: number;
  page: number;
  per_page: number;
  results: ProjectObservation[];
}

export interface ResultsProjects {
  total_results: number;
  page: number;
  per_page: number;
  results: Project[];
}

export interface ResultsProjectsMembers {
  total_results: number;
  page: number;
  per_page: number;
  results: {
    id: number;
    project_id?: number;
    /** @format date-time */
    created_at?: string;
    /** @format date-time */
    updated_at?: string;
    role?: string | null;
    observations_count: number;
    taxa_count?: number;
    user: {
      id: number;
      name?: string | null;
      icon?: string | null;
      login?: string;
      icon_url?: string | null;
      orcid?: string | null;
    };
  }[];
}

export interface ResultsProviderAuthorizations {
  total_results: number;
  page: number;
  per_page: number;
  results: ProviderAuthorization[];
}

export interface ResultsQualityMetrics {
  total_results: number;
  page: number;
  per_page: number;
  results: QualityMetric[];
}

export interface ResultsRelationships {
  total_results: number;
  page: number;
  per_page: number;
  results: Relationship[];
}

export interface SavedLocation {
  /** Unique auto-increment integer identifier. */
  id: number;
  user_id?: number;
  /** @format float */
  latitude?: number;
  /** @format float */
  longitude?: number;
  title?: string;
  positional_accuracy?: number;
  /** @format date-time */
  created_at?: string;
  /** @format date-time */
  updated_at?: string;
  geoprivacy?: "open" | "obscured" | "private" | null;
}

export interface ResultsSavedLocations {
  total_results: number;
  page: number;
  per_page: number;
  results: SavedLocation[];
}

export interface ResultsSearch {
  total_results: number;
  page: number;
  per_page: number;
  results: {
    /**
     * Search score; can be used to sort search results
     * @format float
     */
    score?: number;
    /**
     * Type of record for this search result
     * @example "place"
     */
    type: "place" | "project" | "taxon" | "user";
    /** Array of text field values that matched the search query */
    matches?: string[];
    place?: Place;
    project?: Project;
    taxon?: Taxon;
    user?: User;
  }[];
}

export interface ResultsSites {
  total_results: number;
  page: number;
  per_page: number;
  results: Site[];
}

export interface ResultsSounds {
  total_results: number;
  page: number;
  per_page: number;
  results: Sound[];
}

export interface Subscription {
  /** Unique auto-increment integer identifier. */
  id: number;
  user_id?: number;
  resource_type?: string;
  resource_id?: number;
  created_at?: string;
  updated_at?: string;
  taxon_id?: number;
}

export interface ResultsSubscriptions {
  total_results: number;
  page: number;
  per_page: number;
  results: Subscription[];
}

export interface ResultsTaxa {
  total_results: number;
  page: number;
  per_page: number;
  results: Taxon[];
}

export interface TaxonCount {
  taxon: Taxon;
  count: number;
}

export interface ResultsTaxaCounts {
  total_results: number;
  page: number;
  per_page: number;
  results: TaxonCount[];
}

export interface ResultsTaxaLifelistMetadata {
  total_results: number;
  page: number;
  per_page: number;
  results: {
    id: number;
    name?: string;
    default_photo?: {
      medium_url?: string;
    };
    preferred_common_name?: string | null;
  }[];
}

export interface ResultsTaxaMapLayers {
  total_results: number;
  page: number;
  per_page: number;
  results: {
    /** Unique auto-increment integer identifier. */
    id: number;
    ranges: boolean;
    gbif_id: number | null;
    listed_places: boolean;
    geomodel: boolean;
  }[];
}

export interface ResultsTaxaSuggest {
  /**
   *  Set when the suggestions are believed to be comprehensive given the search
   *       parameters, e.g. if retrieving suggestions for squirrels in California,
   *       these should represent *all* the squirrels known to occur in California.
   *       If blank or absent, that means the suggestions may or may not be
   *       comprehensive. Currently only set when `source` is `checklist`
   *
   */
  comprehensiveness?: {
    /** Source of these comprehensive suggestions */
    list?: {
      /** Unique auto-increment integer identifier. */
      id: number;
      title?: string;
      source?: {
        url?: string;
        in_text?: string;
      };
    };
  };
  /**
   *  Common ancestor taxon of some of the top results weighted by combined score.
   *   If present, it generally has a much higher chance of being accurate (if not
   *   precise), often by as much as 30-40 percentage points.
   */
  common_ancestor?: CommonAncestor;
  results: {
    source_type: string;
    /** @format float */
    score: number;
    source_details?: {
      /** @format float */
      combined_score?: number;
      /** @format float */
      frequency_score?: number;
      listed_taxon?: ListedTaxon;
      observations_count?: number;
      /** @format float */
      vision_score?: number;
    };
    taxon: Taxon;
  }[];
  /**
   *  Query parameters used to generate these results. When `source` is
   *       `*observations` this may have some additional parameters used to set
   *       defaults for the observations query.
   *
   */
  query?: {
    /**
     * When `source` is `observations`, ignore this observation
     * @format uuid
     */
    featured_observation_id?: string;
    fields?: any;
    /**
     * image_url
     * URL for image to use when `source` is `visual`
     */
    image_url?: string;
    include_representative_photos?: boolean | string;
    /**
     * Number of results to return
     * @format float
     * @min 0
     */
    limit?: number;
    /**
     * Coordinate used when fetching nearby results `source` is `visual` or `*observations`
     * @format float
     * @min -90
     * @max 90
     */
    lat?: number;
    /**
     * Coordinate used when fetching nearby results `source` is `visual` or `*observations`
     * @format float
     * @min -180
     * @max 180
     */
    lng?: number;
    locale?: string;
    months?: string;
    /**
     *  Automatically set place and taxon filters based on this observation; this
     *       will override the values of `place_id` and `taxon_id` if these values
     *       can be derived from the observation
     *
     * @format uuid
     */
    observation_id?: string;
    /**
     *  Date the subject was observed (YYYY-MM-DD), used to refine suggestions to
     *       those observed at a similar time of year
     *
     */
    observed_on?: string;
    /**
     *  How the suggestions will be ordered. The default is to order by whatever default
     *       a source uses, e.g. the score when `source` is `visual`, or the number of
     *       observations (frequency) when the `source` is `*observations`. Ordering by
     *       `taxonomy` will group the results by their closeness in the taxonomic
     *       tree, but continue to use default ordering for siblings (e.g. species in the
     *       same genus).
     *
     */
    order_by?: "taxonomy" | "default" | "sciname";
    /**
     *  Only retrieve suggestions from this place when `source` is `checklist`
     *       or `*observations`
     *
     */
    place_id?: number;
    /**
     *  Coordinate used to set a place filter when source is `*observations` by
     *       choosing the place whose boundary contains the coordinate. Only chooses
     *       from places curated by staff (aka "standard" places) and only sets the
     *       place when lat, lng, and place_id are blank
     *
     * @format float
     * @min -90
     * @max 90
     */
    place_lat?: number;
    /**
     * See `place_lat`
     * @format float
     * @min -180
     * @max 180
     */
    place_lng?: number;
    /**
     *  Source of the suggestions. Note that different sources support different
     *       search parameters. See each parameter for details
     *
     */
    source?:
      | "captive_observations"
      | "checklist"
      | "misidentifications"
      | "observations"
      | "rg_observations"
      | "visual"
      | null;
    /**
     *  Only retrieve suggestions in this taxon. If taxon is below genus level it
     *       will be replaced with the genus that contains it. When `source` is
     *       `misidentifications`, suggestions will be species commonly misidentified
     *       as this taxon
     *
     */
    taxon_id?: number;
  };
  queryTaxon?: Taxon;
  queryPlace?: Place;
}

export interface TaxonIdSummary {
  /** Unique auto-increment integer identifier. */
  id: number;
  /**
   * Stable UUID for this taxon_id_summary.
   * @format uuid
   */
  uuid: string;
  /** Whether this summary is the active one for its taxon. */
  active: boolean;
  /** Taxon ID this summary. */
  taxon_id: number;
  /** Scientific name. */
  taxon_name: string;
  /** Common name, if available. */
  taxon_common_name?: string | null;
  /** Photo ID for the taxon */
  taxon_photo_id?: number | null;
  /** Attribution text from the associated photo. */
  taxon_photo_attribution?: string | null;
  /** Observation ID associated with the taxon photo, when the photo comes from an observation. */
  taxon_photo_observation_id?: number | null;
  /** Iconic taxon group, if available. */
  taxon_group?: string | null;
  /** ISO language code for the summary content. */
  language?: string | null;
  /** Label for the run that produced this summary. */
  run_name?: string | null;
  /**
   * Timestamp when the run generated this content.
   * @format date-time
   */
  run_generated_at?: string | null;
  /** Free-text description about the run. */
  run_description?: string | null;
  /**
   * Record creation time (UTC).
   * @format date-time
   */
  created_at: string;
  /**
   * Last update time (UTC).
   * @format date-time
   */
  updated_at: string;
  /**
   * Child IdSummaries for this taxon, each with optional supporting references.
   * @default []
   */
  id_summaries?: IdSummary[];
}

export interface ResultsTaxonIdSummaries {
  total_results: number;
  page: number;
  per_page: number;
  results: TaxonIdSummary[];
}

export interface ResultsTaxonNamePriorities {
  total_results: number;
  page: number;
  per_page: number;
  results: TaxonNamePriority[];
}

export interface ResultsTaxonSummary {
  conservation_status?: ConservationStatus;
  listed_taxon?: ListedTaxon;
  /** Summary description of this taxon from Wikipedia */
  wikipedia_summary?: string | null;
}

export interface ResultsTranslationsLocales {
  total_results: number;
  page: number;
  per_page: number;
  results: {
    locale: string;
    language_in_locale?: string;
  }[];
}

export interface Update {
  /** Unique auto-increment integer identifier. */
  id: number;
  comment?: Comment;
  comment_id?: number | null;
  /** @format date-time */
  created_at?: string;
  identification?: Identification;
  identification_id?: number | null;
  notifier_id?: number;
  notifier_type?: string;
  notification?: string;
  resource_owner_id?: number;
  resource_type?: string;
  resource_id?: number;
  /** @format uuid */
  resource_uuid?: string;
  viewed?: boolean;
}

export interface ResultsUpdates {
  total_results: number;
  page: number;
  per_page: number;
  results: Update[];
}

export interface ResultsUsers {
  total_results: number;
  page: number;
  per_page: number;
  results: User[];
}

export interface ResultsUsersMe {
  total_results: number;
  page: number;
  per_page: number;
  results: PrivateUser[];
}

export interface ResultsUsersNotificationCounts {
  updates_count: number;
  messages_count: number;
}

export interface ResultsUsersTaxaObserved {
  total_results: number;
  page: number;
  per_page: number;
  results: {
    count: number;
    taxon: Taxon;
    /** @format date */
    first_observed_on: string | null;
  }[];
}

export interface Search {
  /**
   * Search score; can be used to sort search results
   * @format float
   */
  score?: number;
  /**
   * Type of record for this search result
   * @example "place"
   */
  type: "place" | "project" | "taxon" | "user";
  /** Array of text field values that matched the search query */
  matches?: string[];
  place?: Place;
  project?: Project;
  taxon?: Taxon;
  user?: User;
}

export interface UtfGrid {
  grid: string[];
  keys: string[];
  data: object;
}

export interface AnnotationsCreate {
  resource_type: string;
  /** @format uuid */
  resource_id: string;
  controlled_attribute_id: number;
  controlled_value_id: number;
}

export interface AnnouncementsSearch {
  placement?:
    | "users/dashboard#sidebar"
    | "users/dashboard"
    | "welcome/index"
    | "mobile/home"
    | "mobile";
  client?: "inat-ios" | "inat-android" | "seek" | "inatrn";
  locale?: string;
  fields?: any;
}

export interface CommentsCreate {
  fields?: any;
  comment: {
    /** Type of record being commented on */
    parent_type: "Observation" | "Post";
    /**
     * UUID of record being commented on
     * @format uuid
     */
    parent_id: string;
    body: string;
  };
}

export interface CommentsUpdate {
  fields?: any;
  comment: {
    body: string;
  };
}

export interface ExemplarIdentificationsSearch {
  direct_taxon_id?: number[];
  taxon_id?: number[];
  term_id?: number[];
  term_value_id?: number[];
  q?: string;
  id?: number;
  /** @format uuid */
  uuid?: string;
  upvoted?: boolean;
  downvoted?: boolean;
  nominated?: boolean;
  include_category_counts?: boolean;
  include_category_controlled_terms?: boolean;
  locale?: string;
  preferred_place_id?: number;
  ttl?: number;
  page?: number;
  per_page?: number;
  /** @default "desc" */
  order?: "desc" | "asc";
  /** @default "id" */
  order_by?: "id" | "created_at" | "votes" | "word_count";
  /** Attribute fields to return in the response */
  fields?: any;
}

export interface FlagsCreate {
  flag?: {
    flaggable_type?: string;
    flaggable_id?: number;
    flag?: string;
  };
  flag_explanation?: string | null;
  fields?: any;
}

export interface FlagsUpdate {
  flag?: {
    resolved?: boolean;
  };
  fields?: any;
}

export interface IdentificationsCreate {
  fields?: any;
  identification: {
    body?: string;
    /** @format uuid */
    observation_id: string;
    taxon_id: number;
    vision?: boolean;
    disagreement?: boolean;
    nominate?: boolean;
  };
}

export interface IdentificationsRecentTaxa {
  page?: number;
  per_page?: number;
  /** fields */
  fields?: string;
  verifiable?: boolean;
  /** ID taxa must match the given taxa or their descendants */
  taxon_id: number[];
  /** Observation must have this quality grade */
  quality_grade?: ("research" | "needs_id" | "casual")[];
  rank?: string;
  category?: string[];
  locale?: string;
}

export interface IdentificationsSearch {
  page?: number;
  per_page?: number;
  /** fields */
  fields?: string;
  /** ID taxa must match the given taxa or their descendants */
  taxon_id?: string[];
  /** Observation must have this quality grade */
  quality_grade?: ("research" | "needs_id" | "casual")[];
}

export interface IdentificationsSimilarSpecies {
  page?: number;
  per_page?: number;
  /** fields */
  fields?: string;
  taxon_id: number;
  /** Observation must have this quality grade */
  quality_grade?: ("research" | "needs_id" | "casual")[];
}

export interface IdentificationsUpdate {
  fields?: any;
  identification: {
    body?: string;
    /** Setting to false means the identification is withdrawn */
    current?: boolean;
  };
}

export interface Messages {
  page?: number;
  fields?: any;
}

export interface MessagesCreate {
  message?: {
    to_user_id?: number;
    thread_id?: number;
    subject?: string;
    body: string;
  };
  fields?: any;
}

export interface ModelPosts {
  page?: number;
  per_page?: number;
  fields?: any;
}

export interface ObservationFieldValuesCreate {
  fields?: any;
  observation_field_value?: {
    /** @format uuid */
    observation_id: string;
    observation_field_id?: number;
    value?: string | number;
  };
}

/** description inside of schema file */
export interface ObservationPhotosCreate {
  fields?: any;
  observation_photo?: {
    /**
     * UUID for the existing observation
     * @format uuid
     */
    observation_id: string;
    /** Sequential ID for the existing photo */
    photo_id?: number;
    position?: number;
    /**
     * New UUID for the photo, helps prevent duplication in poor network conditions
     * @format uuid
     */
    uuid?: string;
  };
}

export interface ObservationPhotosCreateMultipart {
  fields?: any;
  /**
   * UUID for the existing observation
   * @format uuid
   */
  "observation_photo[observation_id]": string;
  /**
   * New UUID for the photo, helps prevent duplication in poor network conditions
   * @format uuid
   */
  "observation_photo[uuid]"?: string;
  "observation_photo[position]"?: number;
  /** @format binary */
  file: File;
}

export interface ObservationPhotosUpdate {
  fields?: any;
  observation_photo?: {
    /** @format uuid */
    observation_id: string;
    position?: number;
  };
}

export interface ObservationSoundsCreate {
  fields?: any;
  observation_sound?: {
    /** @format uuid */
    observation_id: string;
    sound_id?: number;
  };
}

export interface ObservationSoundsCreateMultipart {
  fields?: any;
  /** @format uuid */
  "observation_sound[observation_id]": string;
  /** @format binary */
  file: File;
}

export interface ObservationSoundsUpdate {
  fields?: any;
  observation_sound?: {
    /** @format uuid */
    observation_id: string;
  };
}

export interface ObservationsCreate {
  fields?: any;
  observation?: {
    /** @format uuid */
    uuid?: string;
    captive_flag?: boolean;
    coordinate_system?: string;
    description?: string;
    /** @format float */
    geo_x?: number;
    /** @format float */
    geo_y?: number;
    geoprivacy?: string;
    /** @format float */
    latitude?: number;
    license?: string;
    location_is_exact?: boolean;
    /** @format float */
    longitude?: number;
    make_license_default?: boolean;
    make_licenses_same?: boolean;
    map_scale?: number;
    observation_field_values_attributes?: {
      observation_field_id: number;
      value: any;
    };
    observed_on_string?: string;
    owners_identification_from_vision?: boolean;
    place_guess?: string;
    /** @format float */
    positional_accuracy?: number;
    positioning_device?: string;
    positioning_method?: string;
    project_id?: number;
    prefers_community_taxon?: boolean;
    site_id?: number;
    /** The name of the organism observed. If the taxon ID is absent, iNat will try to choose a single taxon based on this string, but it may fail if there's some taxonomic amgiguity. */
    species_guess?: string;
    tag_list?: string;
    /** @format float */
    taxon_id?: number;
    /** @format float */
    taxon_name?: number;
    time_zone?: string;
  };
}

export interface ObservationsDeleted {
  fields?: any;
  /** @format date */
  since: string;
}

export interface ObservationsHistogram {
  /** Filter by whether `positional_accuracy` is set or not */
  acc?: boolean;
  /** Filter by captive / cultivated status */
  captive?: boolean;
  /** Filter by whether the observation is in a place with a check list entry indicating the establishment means is `endemic` */
  endemic?: boolean;
  /** Filter by observations that are georeferenced */
  geo?: boolean;
  id_please?: boolean;
  /** Filter by observations that have community identifications */
  identified?: boolean;
  /** Filter by observations of taxa that are introduced in their location */
  introduced?: boolean;
  /** Filter by observations that show on map tiles */
  mappable?: boolean;
  /** Filter by observations of taxa that are native to their location */
  native?: boolean;
  /** Filter by observations of taxa that outside their known ranges */
  out_of_range?: boolean;
  pcid?: boolean;
  /** Filter by observations with photos */
  photos?: boolean;
  /** Filter by observations that have been favorited by at least one user */
  popular?: boolean;
  /** Filter by observations with sounds */
  sounds?: boolean;
  /** Filter by observations of active taxa */
  taxon_is_active?: boolean;
  /** Filter by whether the observed taxon has a conservation status of "threatened" or worse */
  threatened?: boolean;
  /** Filter by whether observations are 'verifiable' (i.e. have quality grades `research` or `needs_id`) */
  verifiable?: boolean;
  /** Include observations with this ID */
  id?: (string | number)[];
  /** Exclude observations with this ID */
  not_id?: string[];
  /** Include observations with this license */
  license?: (
    | "cc-by"
    | "cc-by-nc"
    | "cc-by-nd"
    | "cc-by-sa"
    | "cc-by-nc-nd"
    | "cc-by-nc-sa"
    | "cc0"
  )[];
  /** Include observations with least one photo with this license */
  photo_license?: (
    | "cc-by"
    | "cc-by-nc"
    | "cc-by-nd"
    | "cc-by-sa"
    | "cc-by-nc-nd"
    | "cc-by-nc-sa"
    | "cc0"
  )[];
  /** Include observations where the license attribute is not null, i.e. it is licensed */
  licensed?: boolean;
  /** Include observations with at least one photo with a license attribute that is not null */
  photo_licensed?: boolean;
  /** Include observations observed within the place with this ID */
  place_id?: (string | number)[];
  /** Include observations added to the project with this ID or slug */
  project_id?: (number | string)[];
  /** Filter by observers who trust the project(s) specified in `project_id` OR trust the authenticated viewer */
  coords_viewable_for_proj?: boolean;
  /** Include observations of taxa with this rank */
  rank?: (
    | "stateofmatter"
    | "kingdom"
    | "phylum"
    | "subphylum"
    | "superclass"
    | "class"
    | "subclass"
    | "infraclass"
    | "subterclass"
    | "superorder"
    | "order"
    | "suborder"
    | "infraorder"
    | "parvorder"
    | "zoosection"
    | "zoosubsection"
    | "superfamily"
    | "epifamily"
    | "family"
    | "subfamily"
    | "supertribe"
    | "tribe"
    | "subtribe"
    | "genus"
    | "genushybrid"
    | "subgenus"
    | "section"
    | "subsection"
    | "complex"
    | "species"
    | "hybrid"
    | "subspecies"
    | "variety"
    | "form"
    | "infrahybrid"
  )[];
  /** Include observations affiliated with the iNaturalist network website with this ID */
  site_id?: number[];
  /** Include observations that have at least one sound with this license */
  sound_license?: (
    | "cc-by"
    | "cc-by-nc"
    | "cc-by-nd"
    | "cc-by-sa"
    | "cc-by-nc-nd"
    | "cc-by-nc-sa"
    | "cc0"
  )[];
  /** Include observations of this taxon and its descendants */
  taxon_id?: number[];
  /** Exclude observations of this taxon and its descendants */
  without_taxon_id?: number[];
  /** Include observations of taxa that have a scientific or common name matching this string */
  taxon_name?: string;
  /** Include observations observed by users that have this ID or login */
  user_id?: string[];
  /** Include observations observed by users that have this login */
  user_login?: string[];
  /** Include observations observed within this hour of the day */
  hour?: number[];
  /** Include observations observed within this day of the month */
  day?: number[];
  /** Include observations observed within this month */
  month?: number[];
  /** Include observations observed within this year */
  year?: number[];
  /** Include observations created within this day of the month */
  created_day?: number[];
  /** Include observations created within this month */
  created_month?: number[];
  /** Include observations created within this year */
  created_year?: number[];
  /** Include observations with annotations using this controlled term ID */
  term_id?: number[];
  /** Include observations with annotations using this controlled value ID. Must be combined with the `term_id` parameter */
  term_value_id?: number[];
  /** Exclude observations with annotations using this controlled value ID. Must be combined with the `term_id` parameter */
  without_term_value_id?: number[];
  /** Include observations with annotations using this controlled term ID and associated term value IDs, or be missing annotations using this controlled term ID. Must be combined with the `term_value_id` or `without_term_value_id` parameters */
  term_id_or_unknown?: number[];
  /** Include observations with an annotation created by this user */
  annotation_user_id?: string[];
  /** Include observations with a positional accuracy above this value (meters) */
  acc_above?: number;
  /** Include observations with a positional accuracy below this value (meters) */
  acc_below?: number;
  /** Include observations with a positional accuracy below this value (in meters) or with an unknown positional accuracy */
  acc_below_or_unknown?: number;
  /** Include observations observed on or after this date/time */
  d1?: string;
  /** Include observations observed on or before this date/time */
  d2?: string;
  /** Include observations created on or after this date/time */
  created_d1?: string;
  /** Include observations created on or before this date/time */
  created_d2?: string;
  /** Include observations created on this date */
  created_on?: string;
  /** Include observations observed on this date */
  observed_on?: string;
  /** Exclude observations of taxa previously observed by this user */
  unobserved_by_user_id?: string;
  /** Include observations that match the rules of the project with this ID or slug */
  apply_project_rules_for?: string;
  /** Include observations included in this observation accuracy experiment */
  observation_accuracy_experiment_id?: number[];
  /** Include observations of taxa that have this conservation status code. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
  cs?: string;
  /** Include observations of taxa that have a conservation status from this authority. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
  csa?: string;
  /** Include observations of taxa that have this IUCN conservation status. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
  csi?: ("LC" | "NT" | "VU" | "EN" | "CR" | "EW" | "EX")[];
  /** Include observations with this geoprivacy setting */
  geoprivacy?: ("obscured" | "obscured_private" | "open" | "private")[];
  /** Include observations where this is the most conservative geoprivacy applied by a conservation status associated with one of the taxa proposed in the current identifications */
  taxon_geoprivacy?: ("obscured" | "obscured_private" | "open" | "private")[];
  /** Include observations where `geoprivacy` or `taxon_geoprivacy` match these values */
  obscuration?: ("obscured" | "private" | "none")[];
  /** Include observations of taxa with this rank or lower */
  hrank?: (
    | "stateofmatter"
    | "kingdom"
    | "phylum"
    | "subphylum"
    | "superclass"
    | "class"
    | "subclass"
    | "infraclass"
    | "subterclass"
    | "superorder"
    | "order"
    | "suborder"
    | "infraorder"
    | "parvorder"
    | "zoosection"
    | "zoosubsection"
    | "superfamily"
    | "epifamily"
    | "family"
    | "subfamily"
    | "supertribe"
    | "tribe"
    | "subtribe"
    | "genus"
    | "genushybrid"
    | "subgenus"
    | "section"
    | "subsection"
    | "complex"
    | "species"
    | "hybrid"
    | "subspecies"
    | "variety"
    | "form"
    | "infrahybrid"
  )[];
  /** Include observations of taxa with this rank or higher */
  lrank?: (
    | "stateofmatter"
    | "kingdom"
    | "phylum"
    | "subphylum"
    | "superclass"
    | "class"
    | "subclass"
    | "infraclass"
    | "subterclass"
    | "superorder"
    | "order"
    | "suborder"
    | "infraorder"
    | "parvorder"
    | "zoosection"
    | "zoosubsection"
    | "superfamily"
    | "epifamily"
    | "family"
    | "subfamily"
    | "supertribe"
    | "tribe"
    | "subtribe"
    | "genus"
    | "genushybrid"
    | "subgenus"
    | "section"
    | "subsection"
    | "complex"
    | "species"
    | "hybrid"
    | "subspecies"
    | "variety"
    | "form"
    | "infrahybrid"
  )[];
  /** Include observations of taxa within this iconic taxon */
  iconic_taxa?: (
    | "Actinopterygii"
    | "Animalia"
    | "Amphibia"
    | "Arachnida"
    | "Aves"
    | "Chromista"
    | "Fungi"
    | "Insecta"
    | "Mammalia"
    | "Mollusca"
    | "Reptilia"
    | "Plantae"
    | "Protozoa"
    | "unknown"
  )[];
  /** Include observations with an ID above this value */
  id_above?: number;
  /** Include observations with an ID below this value */
  id_below?: number;
  /**
   * Include observations based on level of agreement among identifications:
   *
   * * **most_agree:** includes observations where there are more active identifications of taxa that agree with the Observation Taxon than active identifications that disagree with the Observation Taxon
   * * **some_agree:** includes observations where there are some active identifications of taxa that agree with the Observation Taxon
   * * **most_disagree:** includes observations where there are more active identifications of taxa that disagree with the Observation Taxon than active identifications that agree with the Observation Taxon
   */
  identifications?: "most_agree" | "most_disagree" | "some_agree";
  /** Include observations where there is disagreement among active identifications */
  disagreements?: boolean;
  /**
   * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
   * @format float
   * @min -90
   * @max 90
   */
  lat?: number;
  /**
   * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
   * @format float
   * @min -180
   * @max 180
   */
  lng?: number;
  /**
   * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
   * @format float
   */
  radius?: number;
  /**
   * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
   * @format float
   * @min -90
   * @max 90
   */
  nelat?: number;
  /**
   * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
   * @format float
   * @min -180
   * @max 180
   */
  nelng?: number;
  /**
   * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
   * @format float
   * @min -90
   * @max 90
   */
  swlat?: number;
  /**
   * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
   * @format float
   * @min -180
   * @max 180
   */
  swlng?: number;
  /** Include observations of taxa in a list with this ID */
  list_id?: number;
  /** Exclude observations added to the project this ID or slug */
  not_in_project?: string[];
  /** Exclude observations that match the rules of the project with this ID or slug */
  not_matching_project_rules_for?: string;
  /** Include observations with a description, tags, or place_guess matching this query. Can be combined with `search_on` */
  q?: string;
  /** Include observations where any of these properties match the value of the `q` parameter */
  search_on?:
    | "names"
    | "tags"
    | "description"
    | "place"
    | "taxon_page_obs_photos";
  /** Include observations with this quality grade */
  quality_grade?: ("casual" | "needs_id" | "research")[];
  /** Exclude observations that are casual for any reason other than being marked captive */
  not_casual_excluding_captive?: boolean;
  /** Exclude observations with this observation field */
  without_field?: string;
  /** Include observations with outlinks from this source */
  outlink_source?: string;
  /** Include observations updated since this time */
  updated_since?: string;
  /** Must be combined with the `reviewed` parameter */
  viewer_id?: number;
  /** Filter by observations reviewed by the user with ID matching the value of the `viewer_id` parameter */
  reviewed?: boolean;
  /** Filter by observations expected to occur nearby their location according to the latest iNaturalist Geomodel */
  expected_nearby?: boolean;
  /** Filter by observations voted as not accurately depicting an organism or scene */
  fails_dqa_accurate?: boolean;
  /** Filter by observations voted as not having an accurate date */
  fails_dqa_date?: boolean;
  /** Filter by observations voted as not evidence of an organism */
  fails_dqa_evidence?: boolean;
  /** Filter by observations voted as not having an accurate location */
  fails_dqa_location?: boolean;
  /** Filter by observations voted as the community ID cannot be improved */
  fails_dqa_needs_id?: boolean;
  /** Filter by observations voted as not recent evidence of an organism */
  fails_dqa_recent?: boolean;
  /** Filter by observations voted as not having evidence related to a single subject */
  fails_dqa_subject?: boolean;
  /** Filter by observations voted as not wild */
  fails_dqa_wild?: boolean;
  /** Include observations created by users created after a date. Accepts dates with or without times, e.g. 2025-01-01, as well as relative day, month, or year, e.g. 10d, 2w, 1y */
  user_after?: string;
  /** Include observations created by users created before a date. Accepts dates with or without times, e.g. 2025-01-01, as well as relative day, month, or year, e.g. 10d, 2w, 1y */
  user_before?: string;
  /** Returned taxon common names will be from this locale */
  locale?: string;
  /** Returned taxon common names will prioritize common names from this place */
  preferred_place_id?: number;
  /** Set the `Cache-Control` HTTP header with this value as `max-age`, in seconds. This means subsequent identical requests may be cached on  iNaturalist servers, and commonly within web browsers */
  ttl?: number;
  /**
   * Pagination `page` number
   * @min 0
   */
  page?: number;
  /** Number of results to return in a `page` */
  per_page?: number;
  /**
   * Sort order
   * @default "desc"
   */
  order?: "desc" | "asc";
  /**
   * Attribute to sort on
   * @default "created_at"
   */
  order_by?:
    | "created_at"
    | "geo_score"
    | "id"
    | "observed_on"
    | "random"
    | "species_guess"
    | "updated_at"
    | "votes";
  /** Include observations with this ID */
  only_id?: boolean;
  /**
   * Attribute fields to return in the response
   * @example "species_guess,observed_on"
   */
  fields?: any;
  /** @default "observed" */
  date_field?: "observed" | "created";
  /** @default "month_of_year" */
  interval?:
    | "year"
    | "month"
    | "week"
    | "day"
    | "hour"
    | "month_of_year"
    | "week_of_year";
}

export interface ObservationsObservers {
  /** Filter by whether `positional_accuracy` is set or not */
  acc?: boolean;
  /** Filter by captive / cultivated status */
  captive?: boolean;
  /** Filter by whether the observation is in a place with a check list entry indicating the establishment means is `endemic` */
  endemic?: boolean;
  /** Filter by observations that are georeferenced */
  geo?: boolean;
  id_please?: boolean;
  /** Filter by observations that have community identifications */
  identified?: boolean;
  /** Filter by observations of taxa that are introduced in their location */
  introduced?: boolean;
  /** Filter by observations that show on map tiles */
  mappable?: boolean;
  /** Filter by observations of taxa that are native to their location */
  native?: boolean;
  /** Filter by observations of taxa that outside their known ranges */
  out_of_range?: boolean;
  pcid?: boolean;
  /** Filter by observations with photos */
  photos?: boolean;
  /** Filter by observations that have been favorited by at least one user */
  popular?: boolean;
  /** Filter by observations with sounds */
  sounds?: boolean;
  /** Filter by observations of active taxa */
  taxon_is_active?: boolean;
  /** Filter by whether the observed taxon has a conservation status of "threatened" or worse */
  threatened?: boolean;
  /** Filter by whether observations are 'verifiable' (i.e. have quality grades `research` or `needs_id`) */
  verifiable?: boolean;
  /** Include observations with this ID */
  id?: (string | number)[];
  /** Exclude observations with this ID */
  not_id?: string[];
  /** Include observations with this license */
  license?: (
    | "cc-by"
    | "cc-by-nc"
    | "cc-by-nd"
    | "cc-by-sa"
    | "cc-by-nc-nd"
    | "cc-by-nc-sa"
    | "cc0"
  )[];
  /** Include observations with least one photo with this license */
  photo_license?: (
    | "cc-by"
    | "cc-by-nc"
    | "cc-by-nd"
    | "cc-by-sa"
    | "cc-by-nc-nd"
    | "cc-by-nc-sa"
    | "cc0"
  )[];
  /** Include observations where the license attribute is not null, i.e. it is licensed */
  licensed?: boolean;
  /** Include observations with at least one photo with a license attribute that is not null */
  photo_licensed?: boolean;
  /** Include observations observed within the place with this ID */
  place_id?: (string | number)[];
  /** Include observations added to the project with this ID or slug */
  project_id?: (number | string)[];
  /** Filter by observers who trust the project(s) specified in `project_id` OR trust the authenticated viewer */
  coords_viewable_for_proj?: boolean;
  /** Include observations of taxa with this rank */
  rank?: (
    | "stateofmatter"
    | "kingdom"
    | "phylum"
    | "subphylum"
    | "superclass"
    | "class"
    | "subclass"
    | "infraclass"
    | "subterclass"
    | "superorder"
    | "order"
    | "suborder"
    | "infraorder"
    | "parvorder"
    | "zoosection"
    | "zoosubsection"
    | "superfamily"
    | "epifamily"
    | "family"
    | "subfamily"
    | "supertribe"
    | "tribe"
    | "subtribe"
    | "genus"
    | "genushybrid"
    | "subgenus"
    | "section"
    | "subsection"
    | "complex"
    | "species"
    | "hybrid"
    | "subspecies"
    | "variety"
    | "form"
    | "infrahybrid"
  )[];
  /** Include observations affiliated with the iNaturalist network website with this ID */
  site_id?: number[];
  /** Include observations that have at least one sound with this license */
  sound_license?: (
    | "cc-by"
    | "cc-by-nc"
    | "cc-by-nd"
    | "cc-by-sa"
    | "cc-by-nc-nd"
    | "cc-by-nc-sa"
    | "cc0"
  )[];
  /** Include observations of this taxon and its descendants */
  taxon_id?: number[];
  /** Exclude observations of this taxon and its descendants */
  without_taxon_id?: number[];
  /** Include observations of taxa that have a scientific or common name matching this string */
  taxon_name?: string;
  /** Include observations observed by users that have this ID or login */
  user_id?: string[];
  /** Include observations observed by users that have this login */
  user_login?: string[];
  /** Include observations observed within this hour of the day */
  hour?: number[];
  /** Include observations observed within this day of the month */
  day?: number[];
  /** Include observations observed within this month */
  month?: number[];
  /** Include observations observed within this year */
  year?: number[];
  /** Include observations created within this day of the month */
  created_day?: number[];
  /** Include observations created within this month */
  created_month?: number[];
  /** Include observations created within this year */
  created_year?: number[];
  /** Include observations with annotations using this controlled term ID */
  term_id?: number[];
  /** Include observations with annotations using this controlled value ID. Must be combined with the `term_id` parameter */
  term_value_id?: number[];
  /** Exclude observations with annotations using this controlled value ID. Must be combined with the `term_id` parameter */
  without_term_value_id?: number[];
  /** Include observations with annotations using this controlled term ID and associated term value IDs, or be missing annotations using this controlled term ID. Must be combined with the `term_value_id` or `without_term_value_id` parameters */
  term_id_or_unknown?: number[];
  /** Include observations with an annotation created by this user */
  annotation_user_id?: string[];
  /** Include observations with a positional accuracy above this value (meters) */
  acc_above?: number;
  /** Include observations with a positional accuracy below this value (meters) */
  acc_below?: number;
  /** Include observations with a positional accuracy below this value (in meters) or with an unknown positional accuracy */
  acc_below_or_unknown?: number;
  /** Include observations observed on or after this date/time */
  d1?: string;
  /** Include observations observed on or before this date/time */
  d2?: string;
  /** Include observations created on or after this date/time */
  created_d1?: string;
  /** Include observations created on or before this date/time */
  created_d2?: string;
  /** Include observations created on this date */
  created_on?: string;
  /** Include observations observed on this date */
  observed_on?: string;
  /** Exclude observations of taxa previously observed by this user */
  unobserved_by_user_id?: string;
  /** Include observations that match the rules of the project with this ID or slug */
  apply_project_rules_for?: string;
  /** Include observations included in this observation accuracy experiment */
  observation_accuracy_experiment_id?: number[];
  /** Include observations of taxa that have this conservation status code. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
  cs?: string;
  /** Include observations of taxa that have a conservation status from this authority. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
  csa?: string;
  /** Include observations of taxa that have this IUCN conservation status. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
  csi?: ("LC" | "NT" | "VU" | "EN" | "CR" | "EW" | "EX")[];
  /** Include observations with this geoprivacy setting */
  geoprivacy?: ("obscured" | "obscured_private" | "open" | "private")[];
  /** Include observations where this is the most conservative geoprivacy applied by a conservation status associated with one of the taxa proposed in the current identifications */
  taxon_geoprivacy?: ("obscured" | "obscured_private" | "open" | "private")[];
  /** Include observations where `geoprivacy` or `taxon_geoprivacy` match these values */
  obscuration?: ("obscured" | "private" | "none")[];
  /** Include observations of taxa with this rank or lower */
  hrank?: (
    | "stateofmatter"
    | "kingdom"
    | "phylum"
    | "subphylum"
    | "superclass"
    | "class"
    | "subclass"
    | "infraclass"
    | "subterclass"
    | "superorder"
    | "order"
    | "suborder"
    | "infraorder"
    | "parvorder"
    | "zoosection"
    | "zoosubsection"
    | "superfamily"
    | "epifamily"
    | "family"
    | "subfamily"
    | "supertribe"
    | "tribe"
    | "subtribe"
    | "genus"
    | "genushybrid"
    | "subgenus"
    | "section"
    | "subsection"
    | "complex"
    | "species"
    | "hybrid"
    | "subspecies"
    | "variety"
    | "form"
    | "infrahybrid"
  )[];
  /** Include observations of taxa with this rank or higher */
  lrank?: (
    | "stateofmatter"
    | "kingdom"
    | "phylum"
    | "subphylum"
    | "superclass"
    | "class"
    | "subclass"
    | "infraclass"
    | "subterclass"
    | "superorder"
    | "order"
    | "suborder"
    | "infraorder"
    | "parvorder"
    | "zoosection"
    | "zoosubsection"
    | "superfamily"
    | "epifamily"
    | "family"
    | "subfamily"
    | "supertribe"
    | "tribe"
    | "subtribe"
    | "genus"
    | "genushybrid"
    | "subgenus"
    | "section"
    | "subsection"
    | "complex"
    | "species"
    | "hybrid"
    | "subspecies"
    | "variety"
    | "form"
    | "infrahybrid"
  )[];
  /** Include observations of taxa within this iconic taxon */
  iconic_taxa?: (
    | "Actinopterygii"
    | "Animalia"
    | "Amphibia"
    | "Arachnida"
    | "Aves"
    | "Chromista"
    | "Fungi"
    | "Insecta"
    | "Mammalia"
    | "Mollusca"
    | "Reptilia"
    | "Plantae"
    | "Protozoa"
    | "unknown"
  )[];
  /** Include observations with an ID above this value */
  id_above?: number;
  /** Include observations with an ID below this value */
  id_below?: number;
  /**
   * Include observations based on level of agreement among identifications:
   *
   * * **most_agree:** includes observations where there are more active identifications of taxa that agree with the Observation Taxon than active identifications that disagree with the Observation Taxon
   * * **some_agree:** includes observations where there are some active identifications of taxa that agree with the Observation Taxon
   * * **most_disagree:** includes observations where there are more active identifications of taxa that disagree with the Observation Taxon than active identifications that agree with the Observation Taxon
   */
  identifications?: "most_agree" | "most_disagree" | "some_agree";
  /** Include observations where there is disagreement among active identifications */
  disagreements?: boolean;
  /**
   * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
   * @format float
   * @min -90
   * @max 90
   */
  lat?: number;
  /**
   * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
   * @format float
   * @min -180
   * @max 180
   */
  lng?: number;
  /**
   * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
   * @format float
   */
  radius?: number;
  /**
   * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
   * @format float
   * @min -90
   * @max 90
   */
  nelat?: number;
  /**
   * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
   * @format float
   * @min -180
   * @max 180
   */
  nelng?: number;
  /**
   * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
   * @format float
   * @min -90
   * @max 90
   */
  swlat?: number;
  /**
   * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
   * @format float
   * @min -180
   * @max 180
   */
  swlng?: number;
  /** Include observations of taxa in a list with this ID */
  list_id?: number;
  /** Exclude observations added to the project this ID or slug */
  not_in_project?: string[];
  /** Exclude observations that match the rules of the project with this ID or slug */
  not_matching_project_rules_for?: string;
  /** Include observations with a description, tags, or place_guess matching this query. Can be combined with `search_on` */
  q?: string;
  /** Include observations where any of these properties match the value of the `q` parameter */
  search_on?:
    | "names"
    | "tags"
    | "description"
    | "place"
    | "taxon_page_obs_photos";
  /** Include observations with this quality grade */
  quality_grade?: ("casual" | "needs_id" | "research")[];
  /** Exclude observations that are casual for any reason other than being marked captive */
  not_casual_excluding_captive?: boolean;
  /** Exclude observations with this observation field */
  without_field?: string;
  /** Include observations with outlinks from this source */
  outlink_source?: string;
  /** Include observations updated since this time */
  updated_since?: string;
  /** Must be combined with the `reviewed` parameter */
  viewer_id?: number;
  /** Filter by observations reviewed by the user with ID matching the value of the `viewer_id` parameter */
  reviewed?: boolean;
  /** Filter by observations expected to occur nearby their location according to the latest iNaturalist Geomodel */
  expected_nearby?: boolean;
  /** Filter by observations voted as not accurately depicting an organism or scene */
  fails_dqa_accurate?: boolean;
  /** Filter by observations voted as not having an accurate date */
  fails_dqa_date?: boolean;
  /** Filter by observations voted as not evidence of an organism */
  fails_dqa_evidence?: boolean;
  /** Filter by observations voted as not having an accurate location */
  fails_dqa_location?: boolean;
  /** Filter by observations voted as the community ID cannot be improved */
  fails_dqa_needs_id?: boolean;
  /** Filter by observations voted as not recent evidence of an organism */
  fails_dqa_recent?: boolean;
  /** Filter by observations voted as not having evidence related to a single subject */
  fails_dqa_subject?: boolean;
  /** Filter by observations voted as not wild */
  fails_dqa_wild?: boolean;
  /** Include observations created by users created after a date. Accepts dates with or without times, e.g. 2025-01-01, as well as relative day, month, or year, e.g. 10d, 2w, 1y */
  user_after?: string;
  /** Include observations created by users created before a date. Accepts dates with or without times, e.g. 2025-01-01, as well as relative day, month, or year, e.g. 10d, 2w, 1y */
  user_before?: string;
  /** Returned taxon common names will be from this locale */
  locale?: string;
  /** Returned taxon common names will prioritize common names from this place */
  preferred_place_id?: number;
  /** Set the `Cache-Control` HTTP header with this value as `max-age`, in seconds. This means subsequent identical requests may be cached on  iNaturalist servers, and commonly within web browsers */
  ttl?: number;
  /**
   * Pagination `page` number
   * @min 0
   */
  page?: number;
  /** Number of results to return in a `page` */
  per_page?: number;
  /**
   * Sort order
   * @default "desc"
   */
  order?: "desc" | "asc";
  /** Include observations with this ID */
  only_id?: boolean;
  /**
   * Attribute fields to return in the response
   * @example "species_guess,observed_on"
   */
  fields?: any;
  /** @default "observation_count" */
  order_by?: "observation_count" | "species_count";
}

export interface ObservationsPopularFieldValues {
  /** Filter by whether `positional_accuracy` is set or not */
  acc?: boolean;
  /** Filter by captive / cultivated status */
  captive?: boolean;
  /** Filter by whether the observation is in a place with a check list entry indicating the establishment means is `endemic` */
  endemic?: boolean;
  /** Filter by observations that are georeferenced */
  geo?: boolean;
  id_please?: boolean;
  /** Filter by observations that have community identifications */
  identified?: boolean;
  /** Filter by observations of taxa that are introduced in their location */
  introduced?: boolean;
  /** Filter by observations that show on map tiles */
  mappable?: boolean;
  /** Filter by observations of taxa that are native to their location */
  native?: boolean;
  /** Filter by observations of taxa that outside their known ranges */
  out_of_range?: boolean;
  pcid?: boolean;
  /** Filter by observations with photos */
  photos?: boolean;
  /** Filter by observations that have been favorited by at least one user */
  popular?: boolean;
  /** Filter by observations with sounds */
  sounds?: boolean;
  /** Filter by observations of active taxa */
  taxon_is_active?: boolean;
  /** Filter by whether the observed taxon has a conservation status of "threatened" or worse */
  threatened?: boolean;
  /** Filter by whether observations are 'verifiable' (i.e. have quality grades `research` or `needs_id`) */
  verifiable?: boolean;
  /** Include observations with this ID */
  id?: (string | number)[];
  /** Exclude observations with this ID */
  not_id?: string[];
  /** Include observations with this license */
  license?: (
    | "cc-by"
    | "cc-by-nc"
    | "cc-by-nd"
    | "cc-by-sa"
    | "cc-by-nc-nd"
    | "cc-by-nc-sa"
    | "cc0"
  )[];
  /** Include observations with least one photo with this license */
  photo_license?: (
    | "cc-by"
    | "cc-by-nc"
    | "cc-by-nd"
    | "cc-by-sa"
    | "cc-by-nc-nd"
    | "cc-by-nc-sa"
    | "cc0"
  )[];
  /** Include observations where the license attribute is not null, i.e. it is licensed */
  licensed?: boolean;
  /** Include observations with at least one photo with a license attribute that is not null */
  photo_licensed?: boolean;
  /** Include observations observed within the place with this ID */
  place_id?: (string | number)[];
  /** Include observations added to the project with this ID or slug */
  project_id?: (number | string)[];
  /** Filter by observers who trust the project(s) specified in `project_id` OR trust the authenticated viewer */
  coords_viewable_for_proj?: boolean;
  /** Include observations of taxa with this rank */
  rank?: (
    | "stateofmatter"
    | "kingdom"
    | "phylum"
    | "subphylum"
    | "superclass"
    | "class"
    | "subclass"
    | "infraclass"
    | "subterclass"
    | "superorder"
    | "order"
    | "suborder"
    | "infraorder"
    | "parvorder"
    | "zoosection"
    | "zoosubsection"
    | "superfamily"
    | "epifamily"
    | "family"
    | "subfamily"
    | "supertribe"
    | "tribe"
    | "subtribe"
    | "genus"
    | "genushybrid"
    | "subgenus"
    | "section"
    | "subsection"
    | "complex"
    | "species"
    | "hybrid"
    | "subspecies"
    | "variety"
    | "form"
    | "infrahybrid"
  )[];
  /** Include observations affiliated with the iNaturalist network website with this ID */
  site_id?: number[];
  /** Include observations that have at least one sound with this license */
  sound_license?: (
    | "cc-by"
    | "cc-by-nc"
    | "cc-by-nd"
    | "cc-by-sa"
    | "cc-by-nc-nd"
    | "cc-by-nc-sa"
    | "cc0"
  )[];
  /** Include observations of this taxon and its descendants */
  taxon_id?: number[];
  /** Exclude observations of this taxon and its descendants */
  without_taxon_id?: number[];
  /** Include observations of taxa that have a scientific or common name matching this string */
  taxon_name?: string;
  /** Include observations observed by users that have this ID or login */
  user_id?: string[];
  /** Include observations observed by users that have this login */
  user_login?: string[];
  /** Include observations observed within this hour of the day */
  hour?: number[];
  /** Include observations observed within this day of the month */
  day?: number[];
  /** Include observations observed within this month */
  month?: number[];
  /** Include observations observed within this year */
  year?: number[];
  /** Include observations created within this day of the month */
  created_day?: number[];
  /** Include observations created within this month */
  created_month?: number[];
  /** Include observations created within this year */
  created_year?: number[];
  /** Include observations with annotations using this controlled term ID */
  term_id?: number[];
  /** Include observations with annotations using this controlled value ID. Must be combined with the `term_id` parameter */
  term_value_id?: number[];
  /** Exclude observations with annotations using this controlled value ID. Must be combined with the `term_id` parameter */
  without_term_value_id?: number[];
  /** Include observations with annotations using this controlled term ID and associated term value IDs, or be missing annotations using this controlled term ID. Must be combined with the `term_value_id` or `without_term_value_id` parameters */
  term_id_or_unknown?: number[];
  /** Include observations with an annotation created by this user */
  annotation_user_id?: string[];
  /** Include observations with a positional accuracy above this value (meters) */
  acc_above?: number;
  /** Include observations with a positional accuracy below this value (meters) */
  acc_below?: number;
  /** Include observations with a positional accuracy below this value (in meters) or with an unknown positional accuracy */
  acc_below_or_unknown?: number;
  /** Include observations observed on or after this date/time */
  d1?: string;
  /** Include observations observed on or before this date/time */
  d2?: string;
  /** Include observations created on or after this date/time */
  created_d1?: string;
  /** Include observations created on or before this date/time */
  created_d2?: string;
  /** Include observations created on this date */
  created_on?: string;
  /** Include observations observed on this date */
  observed_on?: string;
  /** Exclude observations of taxa previously observed by this user */
  unobserved_by_user_id?: string;
  /** Include observations that match the rules of the project with this ID or slug */
  apply_project_rules_for?: string;
  /** Include observations included in this observation accuracy experiment */
  observation_accuracy_experiment_id?: number[];
  /** Include observations of taxa that have this conservation status code. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
  cs?: string;
  /** Include observations of taxa that have a conservation status from this authority. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
  csa?: string;
  /** Include observations of taxa that have this IUCN conservation status. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
  csi?: ("LC" | "NT" | "VU" | "EN" | "CR" | "EW" | "EX")[];
  /** Include observations with this geoprivacy setting */
  geoprivacy?: ("obscured" | "obscured_private" | "open" | "private")[];
  /** Include observations where this is the most conservative geoprivacy applied by a conservation status associated with one of the taxa proposed in the current identifications */
  taxon_geoprivacy?: ("obscured" | "obscured_private" | "open" | "private")[];
  /** Include observations where `geoprivacy` or `taxon_geoprivacy` match these values */
  obscuration?: ("obscured" | "private" | "none")[];
  /** Include observations of taxa with this rank or lower */
  hrank?: (
    | "stateofmatter"
    | "kingdom"
    | "phylum"
    | "subphylum"
    | "superclass"
    | "class"
    | "subclass"
    | "infraclass"
    | "subterclass"
    | "superorder"
    | "order"
    | "suborder"
    | "infraorder"
    | "parvorder"
    | "zoosection"
    | "zoosubsection"
    | "superfamily"
    | "epifamily"
    | "family"
    | "subfamily"
    | "supertribe"
    | "tribe"
    | "subtribe"
    | "genus"
    | "genushybrid"
    | "subgenus"
    | "section"
    | "subsection"
    | "complex"
    | "species"
    | "hybrid"
    | "subspecies"
    | "variety"
    | "form"
    | "infrahybrid"
  )[];
  /** Include observations of taxa with this rank or higher */
  lrank?: (
    | "stateofmatter"
    | "kingdom"
    | "phylum"
    | "subphylum"
    | "superclass"
    | "class"
    | "subclass"
    | "infraclass"
    | "subterclass"
    | "superorder"
    | "order"
    | "suborder"
    | "infraorder"
    | "parvorder"
    | "zoosection"
    | "zoosubsection"
    | "superfamily"
    | "epifamily"
    | "family"
    | "subfamily"
    | "supertribe"
    | "tribe"
    | "subtribe"
    | "genus"
    | "genushybrid"
    | "subgenus"
    | "section"
    | "subsection"
    | "complex"
    | "species"
    | "hybrid"
    | "subspecies"
    | "variety"
    | "form"
    | "infrahybrid"
  )[];
  /** Include observations of taxa within this iconic taxon */
  iconic_taxa?: (
    | "Actinopterygii"
    | "Animalia"
    | "Amphibia"
    | "Arachnida"
    | "Aves"
    | "Chromista"
    | "Fungi"
    | "Insecta"
    | "Mammalia"
    | "Mollusca"
    | "Reptilia"
    | "Plantae"
    | "Protozoa"
    | "unknown"
  )[];
  /** Include observations with an ID above this value */
  id_above?: number;
  /** Include observations with an ID below this value */
  id_below?: number;
  /**
   * Include observations based on level of agreement among identifications:
   *
   * * **most_agree:** includes observations where there are more active identifications of taxa that agree with the Observation Taxon than active identifications that disagree with the Observation Taxon
   * * **some_agree:** includes observations where there are some active identifications of taxa that agree with the Observation Taxon
   * * **most_disagree:** includes observations where there are more active identifications of taxa that disagree with the Observation Taxon than active identifications that agree with the Observation Taxon
   */
  identifications?: "most_agree" | "most_disagree" | "some_agree";
  /** Include observations where there is disagreement among active identifications */
  disagreements?: boolean;
  /**
   * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
   * @format float
   * @min -90
   * @max 90
   */
  lat?: number;
  /**
   * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
   * @format float
   * @min -180
   * @max 180
   */
  lng?: number;
  /**
   * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
   * @format float
   */
  radius?: number;
  /**
   * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
   * @format float
   * @min -90
   * @max 90
   */
  nelat?: number;
  /**
   * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
   * @format float
   * @min -180
   * @max 180
   */
  nelng?: number;
  /**
   * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
   * @format float
   * @min -90
   * @max 90
   */
  swlat?: number;
  /**
   * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
   * @format float
   * @min -180
   * @max 180
   */
  swlng?: number;
  /** Include observations of taxa in a list with this ID */
  list_id?: number;
  /** Exclude observations added to the project this ID or slug */
  not_in_project?: string[];
  /** Exclude observations that match the rules of the project with this ID or slug */
  not_matching_project_rules_for?: string;
  /** Include observations with a description, tags, or place_guess matching this query. Can be combined with `search_on` */
  q?: string;
  /** Include observations where any of these properties match the value of the `q` parameter */
  search_on?:
    | "names"
    | "tags"
    | "description"
    | "place"
    | "taxon_page_obs_photos";
  /** Include observations with this quality grade */
  quality_grade?: ("casual" | "needs_id" | "research")[];
  /** Exclude observations that are casual for any reason other than being marked captive */
  not_casual_excluding_captive?: boolean;
  /** Exclude observations with this observation field */
  without_field?: string;
  /** Include observations with outlinks from this source */
  outlink_source?: string;
  /** Include observations updated since this time */
  updated_since?: string;
  /** Must be combined with the `reviewed` parameter */
  viewer_id?: number;
  /** Filter by observations reviewed by the user with ID matching the value of the `viewer_id` parameter */
  reviewed?: boolean;
  /** Filter by observations expected to occur nearby their location according to the latest iNaturalist Geomodel */
  expected_nearby?: boolean;
  /** Filter by observations voted as not accurately depicting an organism or scene */
  fails_dqa_accurate?: boolean;
  /** Filter by observations voted as not having an accurate date */
  fails_dqa_date?: boolean;
  /** Filter by observations voted as not evidence of an organism */
  fails_dqa_evidence?: boolean;
  /** Filter by observations voted as not having an accurate location */
  fails_dqa_location?: boolean;
  /** Filter by observations voted as the community ID cannot be improved */
  fails_dqa_needs_id?: boolean;
  /** Filter by observations voted as not recent evidence of an organism */
  fails_dqa_recent?: boolean;
  /** Filter by observations voted as not having evidence related to a single subject */
  fails_dqa_subject?: boolean;
  /** Filter by observations voted as not wild */
  fails_dqa_wild?: boolean;
  /** Include observations created by users created after a date. Accepts dates with or without times, e.g. 2025-01-01, as well as relative day, month, or year, e.g. 10d, 2w, 1y */
  user_after?: string;
  /** Include observations created by users created before a date. Accepts dates with or without times, e.g. 2025-01-01, as well as relative day, month, or year, e.g. 10d, 2w, 1y */
  user_before?: string;
  /** Returned taxon common names will be from this locale */
  locale?: string;
  /** Returned taxon common names will prioritize common names from this place */
  preferred_place_id?: number;
  /** Set the `Cache-Control` HTTP header with this value as `max-age`, in seconds. This means subsequent identical requests may be cached on  iNaturalist servers, and commonly within web browsers */
  ttl?: number;
  /**
   * Pagination `page` number
   * @min 0
   */
  page?: number;
  /** Number of results to return in a `page` */
  per_page?: number;
  /**
   * Sort order
   * @default "desc"
   */
  order?: "desc" | "asc";
  /**
   * Attribute to sort on
   * @default "created_at"
   */
  order_by?:
    | "created_at"
    | "geo_score"
    | "id"
    | "observed_on"
    | "random"
    | "species_guess"
    | "updated_at"
    | "votes";
  /** Include observations with this ID */
  only_id?: boolean;
  /**
   * Attribute fields to return in the response
   * @example "species_guess,observed_on"
   */
  fields?: any;
  no_histograms?: boolean;
  unannotated?: boolean;
  /** @default "observed" */
  date_field?: "observed" | "created";
  /** @default "month_of_year" */
  interval?: "month_of_year" | "week_of_year";
}

export interface ObservationsSearch {
  /** Filter by whether `positional_accuracy` is set or not */
  acc?: boolean;
  /** Filter by captive / cultivated status */
  captive?: boolean;
  /** Filter by whether the observation is in a place with a check list entry indicating the establishment means is `endemic` */
  endemic?: boolean;
  /** Filter by observations that are georeferenced */
  geo?: boolean;
  id_please?: boolean;
  /** Filter by observations that have community identifications */
  identified?: boolean;
  /** Filter by observations of taxa that are introduced in their location */
  introduced?: boolean;
  /** Filter by observations that show on map tiles */
  mappable?: boolean;
  /** Filter by observations of taxa that are native to their location */
  native?: boolean;
  /** Filter by observations of taxa that outside their known ranges */
  out_of_range?: boolean;
  pcid?: boolean;
  /** Filter by observations with photos */
  photos?: boolean;
  /** Filter by observations that have been favorited by at least one user */
  popular?: boolean;
  /** Filter by observations with sounds */
  sounds?: boolean;
  /** Filter by observations of active taxa */
  taxon_is_active?: boolean;
  /** Filter by whether the observed taxon has a conservation status of "threatened" or worse */
  threatened?: boolean;
  /** Filter by whether observations are 'verifiable' (i.e. have quality grades `research` or `needs_id`) */
  verifiable?: boolean;
  /** Include observations with this ID */
  id?: (string | number)[];
  /** Exclude observations with this ID */
  not_id?: string[];
  /** Include observations with this license */
  license?: (
    | "cc-by"
    | "cc-by-nc"
    | "cc-by-nd"
    | "cc-by-sa"
    | "cc-by-nc-nd"
    | "cc-by-nc-sa"
    | "cc0"
  )[];
  /** Include observations with least one photo with this license */
  photo_license?: (
    | "cc-by"
    | "cc-by-nc"
    | "cc-by-nd"
    | "cc-by-sa"
    | "cc-by-nc-nd"
    | "cc-by-nc-sa"
    | "cc0"
  )[];
  /** Include observations where the license attribute is not null, i.e. it is licensed */
  licensed?: boolean;
  /** Include observations with at least one photo with a license attribute that is not null */
  photo_licensed?: boolean;
  /** Include observations observed within the place with this ID */
  place_id?: (string | number)[];
  /** Include observations added to the project with this ID or slug */
  project_id?: (number | string)[];
  /** Filter by observers who trust the project(s) specified in `project_id` OR trust the authenticated viewer */
  coords_viewable_for_proj?: boolean;
  /** Include observations of taxa with this rank */
  rank?: (
    | "stateofmatter"
    | "kingdom"
    | "phylum"
    | "subphylum"
    | "superclass"
    | "class"
    | "subclass"
    | "infraclass"
    | "subterclass"
    | "superorder"
    | "order"
    | "suborder"
    | "infraorder"
    | "parvorder"
    | "zoosection"
    | "zoosubsection"
    | "superfamily"
    | "epifamily"
    | "family"
    | "subfamily"
    | "supertribe"
    | "tribe"
    | "subtribe"
    | "genus"
    | "genushybrid"
    | "subgenus"
    | "section"
    | "subsection"
    | "complex"
    | "species"
    | "hybrid"
    | "subspecies"
    | "variety"
    | "form"
    | "infrahybrid"
  )[];
  /** Include observations affiliated with the iNaturalist network website with this ID */
  site_id?: number[];
  /** Include observations that have at least one sound with this license */
  sound_license?: (
    | "cc-by"
    | "cc-by-nc"
    | "cc-by-nd"
    | "cc-by-sa"
    | "cc-by-nc-nd"
    | "cc-by-nc-sa"
    | "cc0"
  )[];
  /** Include observations of this taxon and its descendants */
  taxon_id?: number[];
  /** Exclude observations of this taxon and its descendants */
  without_taxon_id?: number[];
  /** Include observations of taxa that have a scientific or common name matching this string */
  taxon_name?: string;
  /** Include observations observed by users that have this ID or login */
  user_id?: string[];
  /** Include observations observed by users that have this login */
  user_login?: string[];
  /** Include observations observed within this hour of the day */
  hour?: number[];
  /** Include observations observed within this day of the month */
  day?: number[];
  /** Include observations observed within this month */
  month?: number[];
  /** Include observations observed within this year */
  year?: number[];
  /** Include observations created within this day of the month */
  created_day?: number[];
  /** Include observations created within this month */
  created_month?: number[];
  /** Include observations created within this year */
  created_year?: number[];
  /** Include observations with annotations using this controlled term ID */
  term_id?: number[];
  /** Include observations with annotations using this controlled value ID. Must be combined with the `term_id` parameter */
  term_value_id?: number[];
  /** Exclude observations with annotations using this controlled value ID. Must be combined with the `term_id` parameter */
  without_term_value_id?: number[];
  /** Include observations with annotations using this controlled term ID and associated term value IDs, or be missing annotations using this controlled term ID. Must be combined with the `term_value_id` or `without_term_value_id` parameters */
  term_id_or_unknown?: number[];
  /** Include observations with an annotation created by this user */
  annotation_user_id?: string[];
  /** Include observations with a positional accuracy above this value (meters) */
  acc_above?: number;
  /** Include observations with a positional accuracy below this value (meters) */
  acc_below?: number;
  /** Include observations with a positional accuracy below this value (in meters) or with an unknown positional accuracy */
  acc_below_or_unknown?: number;
  /** Include observations observed on or after this date/time */
  d1?: string;
  /** Include observations observed on or before this date/time */
  d2?: string;
  /** Include observations created on or after this date/time */
  created_d1?: string;
  /** Include observations created on or before this date/time */
  created_d2?: string;
  /** Include observations created on this date */
  created_on?: string;
  /** Include observations observed on this date */
  observed_on?: string;
  /** Exclude observations of taxa previously observed by this user */
  unobserved_by_user_id?: string;
  /** Include observations that match the rules of the project with this ID or slug */
  apply_project_rules_for?: string;
  /** Include observations included in this observation accuracy experiment */
  observation_accuracy_experiment_id?: number[];
  /** Include observations of taxa that have this conservation status code. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
  cs?: string;
  /** Include observations of taxa that have a conservation status from this authority. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
  csa?: string;
  /** Include observations of taxa that have this IUCN conservation status. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
  csi?: ("LC" | "NT" | "VU" | "EN" | "CR" | "EW" | "EX")[];
  /** Include observations with this geoprivacy setting */
  geoprivacy?: ("obscured" | "obscured_private" | "open" | "private")[];
  /** Include observations where this is the most conservative geoprivacy applied by a conservation status associated with one of the taxa proposed in the current identifications */
  taxon_geoprivacy?: ("obscured" | "obscured_private" | "open" | "private")[];
  /** Include observations where `geoprivacy` or `taxon_geoprivacy` match these values */
  obscuration?: ("obscured" | "private" | "none")[];
  /** Include observations of taxa with this rank or lower */
  hrank?: (
    | "stateofmatter"
    | "kingdom"
    | "phylum"
    | "subphylum"
    | "superclass"
    | "class"
    | "subclass"
    | "infraclass"
    | "subterclass"
    | "superorder"
    | "order"
    | "suborder"
    | "infraorder"
    | "parvorder"
    | "zoosection"
    | "zoosubsection"
    | "superfamily"
    | "epifamily"
    | "family"
    | "subfamily"
    | "supertribe"
    | "tribe"
    | "subtribe"
    | "genus"
    | "genushybrid"
    | "subgenus"
    | "section"
    | "subsection"
    | "complex"
    | "species"
    | "hybrid"
    | "subspecies"
    | "variety"
    | "form"
    | "infrahybrid"
  )[];
  /** Include observations of taxa with this rank or higher */
  lrank?: (
    | "stateofmatter"
    | "kingdom"
    | "phylum"
    | "subphylum"
    | "superclass"
    | "class"
    | "subclass"
    | "infraclass"
    | "subterclass"
    | "superorder"
    | "order"
    | "suborder"
    | "infraorder"
    | "parvorder"
    | "zoosection"
    | "zoosubsection"
    | "superfamily"
    | "epifamily"
    | "family"
    | "subfamily"
    | "supertribe"
    | "tribe"
    | "subtribe"
    | "genus"
    | "genushybrid"
    | "subgenus"
    | "section"
    | "subsection"
    | "complex"
    | "species"
    | "hybrid"
    | "subspecies"
    | "variety"
    | "form"
    | "infrahybrid"
  )[];
  /** Include observations of taxa within this iconic taxon */
  iconic_taxa?: (
    | "Actinopterygii"
    | "Animalia"
    | "Amphibia"
    | "Arachnida"
    | "Aves"
    | "Chromista"
    | "Fungi"
    | "Insecta"
    | "Mammalia"
    | "Mollusca"
    | "Reptilia"
    | "Plantae"
    | "Protozoa"
    | "unknown"
  )[];
  /** Include observations with an ID above this value */
  id_above?: number;
  /** Include observations with an ID below this value */
  id_below?: number;
  /**
   * Include observations based on level of agreement among identifications:
   *
   * * **most_agree:** includes observations where there are more active identifications of taxa that agree with the Observation Taxon than active identifications that disagree with the Observation Taxon
   * * **some_agree:** includes observations where there are some active identifications of taxa that agree with the Observation Taxon
   * * **most_disagree:** includes observations where there are more active identifications of taxa that disagree with the Observation Taxon than active identifications that agree with the Observation Taxon
   */
  identifications?: "most_agree" | "most_disagree" | "some_agree";
  /** Include observations where there is disagreement among active identifications */
  disagreements?: boolean;
  /**
   * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
   * @format float
   * @min -90
   * @max 90
   */
  lat?: number;
  /**
   * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
   * @format float
   * @min -180
   * @max 180
   */
  lng?: number;
  /**
   * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
   * @format float
   */
  radius?: number;
  /**
   * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
   * @format float
   * @min -90
   * @max 90
   */
  nelat?: number;
  /**
   * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
   * @format float
   * @min -180
   * @max 180
   */
  nelng?: number;
  /**
   * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
   * @format float
   * @min -90
   * @max 90
   */
  swlat?: number;
  /**
   * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
   * @format float
   * @min -180
   * @max 180
   */
  swlng?: number;
  /** Include observations of taxa in a list with this ID */
  list_id?: number;
  /** Exclude observations added to the project this ID or slug */
  not_in_project?: string[];
  /** Exclude observations that match the rules of the project with this ID or slug */
  not_matching_project_rules_for?: string;
  /** Include observations with a description, tags, or place_guess matching this query. Can be combined with `search_on` */
  q?: string;
  /** Include observations where any of these properties match the value of the `q` parameter */
  search_on?:
    | "names"
    | "tags"
    | "description"
    | "place"
    | "taxon_page_obs_photos";
  /** Include observations with this quality grade */
  quality_grade?: ("casual" | "needs_id" | "research")[];
  /** Exclude observations that are casual for any reason other than being marked captive */
  not_casual_excluding_captive?: boolean;
  /** Exclude observations with this observation field */
  without_field?: string;
  /** Include observations with outlinks from this source */
  outlink_source?: string;
  /** Include observations updated since this time */
  updated_since?: string;
  /** Must be combined with the `reviewed` parameter */
  viewer_id?: number;
  /** Filter by observations reviewed by the user with ID matching the value of the `viewer_id` parameter */
  reviewed?: boolean;
  /** Filter by observations expected to occur nearby their location according to the latest iNaturalist Geomodel */
  expected_nearby?: boolean;
  /** Filter by observations voted as not accurately depicting an organism or scene */
  fails_dqa_accurate?: boolean;
  /** Filter by observations voted as not having an accurate date */
  fails_dqa_date?: boolean;
  /** Filter by observations voted as not evidence of an organism */
  fails_dqa_evidence?: boolean;
  /** Filter by observations voted as not having an accurate location */
  fails_dqa_location?: boolean;
  /** Filter by observations voted as the community ID cannot be improved */
  fails_dqa_needs_id?: boolean;
  /** Filter by observations voted as not recent evidence of an organism */
  fails_dqa_recent?: boolean;
  /** Filter by observations voted as not having evidence related to a single subject */
  fails_dqa_subject?: boolean;
  /** Filter by observations voted as not wild */
  fails_dqa_wild?: boolean;
  /** Include observations created by users created after a date. Accepts dates with or without times, e.g. 2025-01-01, as well as relative day, month, or year, e.g. 10d, 2w, 1y */
  user_after?: string;
  /** Include observations created by users created before a date. Accepts dates with or without times, e.g. 2025-01-01, as well as relative day, month, or year, e.g. 10d, 2w, 1y */
  user_before?: string;
  /** Returned taxon common names will be from this locale */
  locale?: string;
  /** Returned taxon common names will prioritize common names from this place */
  preferred_place_id?: number;
  /** Set the `Cache-Control` HTTP header with this value as `max-age`, in seconds. This means subsequent identical requests may be cached on  iNaturalist servers, and commonly within web browsers */
  ttl?: number;
  /**
   * Pagination `page` number
   * @min 0
   */
  page?: number;
  /** Number of results to return in a `page` */
  per_page?: number;
  /**
   * Sort order
   * @default "desc"
   */
  order?: "desc" | "asc";
  /**
   * Attribute to sort on
   * @default "created_at"
   */
  order_by?:
    | "created_at"
    | "geo_score"
    | "id"
    | "observed_on"
    | "random"
    | "species_guess"
    | "updated_at"
    | "votes";
  /** Include observations with this ID */
  only_id?: boolean;
  /**
   * Attribute fields to return in the response
   * @example "species_guess,observed_on"
   */
  fields?: any;
}

export interface ObservationsTaxa {
  /** Include observations observed by users that have this ID or login */
  user_id: string[];
  /** Filter by whether `positional_accuracy` is set or not */
  acc?: boolean;
  /** Filter by captive / cultivated status */
  captive?: boolean;
  /** Filter by whether the observation is in a place with a check list entry indicating the establishment means is `endemic` */
  endemic?: boolean;
  /** Filter by observations that are georeferenced */
  geo?: boolean;
  id_please?: boolean;
  /** Filter by observations that have community identifications */
  identified?: boolean;
  /** Filter by observations of taxa that are introduced in their location */
  introduced?: boolean;
  /** Filter by observations that show on map tiles */
  mappable?: boolean;
  /** Filter by observations of taxa that are native to their location */
  native?: boolean;
  /** Filter by observations of taxa that outside their known ranges */
  out_of_range?: boolean;
  pcid?: boolean;
  /** Filter by observations with photos */
  photos?: boolean;
  /** Filter by observations that have been favorited by at least one user */
  popular?: boolean;
  /** Filter by observations with sounds */
  sounds?: boolean;
  /** Filter by observations of active taxa */
  taxon_is_active?: boolean;
  /** Filter by whether the observed taxon has a conservation status of "threatened" or worse */
  threatened?: boolean;
  /** Filter by whether observations are 'verifiable' (i.e. have quality grades `research` or `needs_id`) */
  verifiable?: boolean;
  /** Include observations with this ID */
  id?: (string | number)[];
  /** Exclude observations with this ID */
  not_id?: string[];
  /** Include observations with this license */
  license?: (
    | "cc-by"
    | "cc-by-nc"
    | "cc-by-nd"
    | "cc-by-sa"
    | "cc-by-nc-nd"
    | "cc-by-nc-sa"
    | "cc0"
  )[];
  /** Include observations with least one photo with this license */
  photo_license?: (
    | "cc-by"
    | "cc-by-nc"
    | "cc-by-nd"
    | "cc-by-sa"
    | "cc-by-nc-nd"
    | "cc-by-nc-sa"
    | "cc0"
  )[];
  /** Include observations where the license attribute is not null, i.e. it is licensed */
  licensed?: boolean;
  /** Include observations with at least one photo with a license attribute that is not null */
  photo_licensed?: boolean;
  /** Include observations observed within the place with this ID */
  place_id?: (string | number)[];
  /** Include observations added to the project with this ID or slug */
  project_id?: (number | string)[];
  /** Filter by observers who trust the project(s) specified in `project_id` OR trust the authenticated viewer */
  coords_viewable_for_proj?: boolean;
  /** Include observations of taxa with this rank */
  rank?: (
    | "stateofmatter"
    | "kingdom"
    | "phylum"
    | "subphylum"
    | "superclass"
    | "class"
    | "subclass"
    | "infraclass"
    | "subterclass"
    | "superorder"
    | "order"
    | "suborder"
    | "infraorder"
    | "parvorder"
    | "zoosection"
    | "zoosubsection"
    | "superfamily"
    | "epifamily"
    | "family"
    | "subfamily"
    | "supertribe"
    | "tribe"
    | "subtribe"
    | "genus"
    | "genushybrid"
    | "subgenus"
    | "section"
    | "subsection"
    | "complex"
    | "species"
    | "hybrid"
    | "subspecies"
    | "variety"
    | "form"
    | "infrahybrid"
  )[];
  /** Include observations affiliated with the iNaturalist network website with this ID */
  site_id?: number[];
  /** Include observations that have at least one sound with this license */
  sound_license?: (
    | "cc-by"
    | "cc-by-nc"
    | "cc-by-nd"
    | "cc-by-sa"
    | "cc-by-nc-nd"
    | "cc-by-nc-sa"
    | "cc0"
  )[];
  /** Include observations of this taxon and its descendants */
  taxon_id?: number[];
  /** Exclude observations of this taxon and its descendants */
  without_taxon_id?: number[];
  /** Include observations of taxa that have a scientific or common name matching this string */
  taxon_name?: string;
  /** Include observations observed by users that have this login */
  user_login?: string[];
  /** Include observations observed within this hour of the day */
  hour?: number[];
  /** Include observations observed within this day of the month */
  day?: number[];
  /** Include observations observed within this month */
  month?: number[];
  /** Include observations observed within this year */
  year?: number[];
  /** Include observations created within this day of the month */
  created_day?: number[];
  /** Include observations created within this month */
  created_month?: number[];
  /** Include observations created within this year */
  created_year?: number[];
  /** Include observations with annotations using this controlled term ID */
  term_id?: number[];
  /** Include observations with annotations using this controlled value ID. Must be combined with the `term_id` parameter */
  term_value_id?: number[];
  /** Exclude observations with annotations using this controlled value ID. Must be combined with the `term_id` parameter */
  without_term_value_id?: number[];
  /** Include observations with annotations using this controlled term ID and associated term value IDs, or be missing annotations using this controlled term ID. Must be combined with the `term_value_id` or `without_term_value_id` parameters */
  term_id_or_unknown?: number[];
  /** Include observations with an annotation created by this user */
  annotation_user_id?: string[];
  /** Include observations with a positional accuracy above this value (meters) */
  acc_above?: number;
  /** Include observations with a positional accuracy below this value (meters) */
  acc_below?: number;
  /** Include observations with a positional accuracy below this value (in meters) or with an unknown positional accuracy */
  acc_below_or_unknown?: number;
  /** Include observations observed on or after this date/time */
  d1?: string;
  /** Include observations observed on or before this date/time */
  d2?: string;
  /** Include observations created on or after this date/time */
  created_d1?: string;
  /** Include observations created on or before this date/time */
  created_d2?: string;
  /** Include observations created on this date */
  created_on?: string;
  /** Include observations observed on this date */
  observed_on?: string;
  /** Exclude observations of taxa previously observed by this user */
  unobserved_by_user_id?: string;
  /** Include observations that match the rules of the project with this ID or slug */
  apply_project_rules_for?: string;
  /** Include observations included in this observation accuracy experiment */
  observation_accuracy_experiment_id?: number[];
  /** Include observations of taxa that have this conservation status code. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
  cs?: string;
  /** Include observations of taxa that have a conservation status from this authority. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
  csa?: string;
  /** Include observations of taxa that have this IUCN conservation status. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
  csi?: ("LC" | "NT" | "VU" | "EN" | "CR" | "EW" | "EX")[];
  /** Include observations with this geoprivacy setting */
  geoprivacy?: ("obscured" | "obscured_private" | "open" | "private")[];
  /** Include observations where this is the most conservative geoprivacy applied by a conservation status associated with one of the taxa proposed in the current identifications */
  taxon_geoprivacy?: ("obscured" | "obscured_private" | "open" | "private")[];
  /** Include observations where `geoprivacy` or `taxon_geoprivacy` match these values */
  obscuration?: ("obscured" | "private" | "none")[];
  /** Include observations of taxa with this rank or lower */
  hrank?: (
    | "stateofmatter"
    | "kingdom"
    | "phylum"
    | "subphylum"
    | "superclass"
    | "class"
    | "subclass"
    | "infraclass"
    | "subterclass"
    | "superorder"
    | "order"
    | "suborder"
    | "infraorder"
    | "parvorder"
    | "zoosection"
    | "zoosubsection"
    | "superfamily"
    | "epifamily"
    | "family"
    | "subfamily"
    | "supertribe"
    | "tribe"
    | "subtribe"
    | "genus"
    | "genushybrid"
    | "subgenus"
    | "section"
    | "subsection"
    | "complex"
    | "species"
    | "hybrid"
    | "subspecies"
    | "variety"
    | "form"
    | "infrahybrid"
  )[];
  /** Include observations of taxa with this rank or higher */
  lrank?: (
    | "stateofmatter"
    | "kingdom"
    | "phylum"
    | "subphylum"
    | "superclass"
    | "class"
    | "subclass"
    | "infraclass"
    | "subterclass"
    | "superorder"
    | "order"
    | "suborder"
    | "infraorder"
    | "parvorder"
    | "zoosection"
    | "zoosubsection"
    | "superfamily"
    | "epifamily"
    | "family"
    | "subfamily"
    | "supertribe"
    | "tribe"
    | "subtribe"
    | "genus"
    | "genushybrid"
    | "subgenus"
    | "section"
    | "subsection"
    | "complex"
    | "species"
    | "hybrid"
    | "subspecies"
    | "variety"
    | "form"
    | "infrahybrid"
  )[];
  /** Include observations of taxa within this iconic taxon */
  iconic_taxa?: (
    | "Actinopterygii"
    | "Animalia"
    | "Amphibia"
    | "Arachnida"
    | "Aves"
    | "Chromista"
    | "Fungi"
    | "Insecta"
    | "Mammalia"
    | "Mollusca"
    | "Reptilia"
    | "Plantae"
    | "Protozoa"
    | "unknown"
  )[];
  /** Include observations with an ID above this value */
  id_above?: number;
  /** Include observations with an ID below this value */
  id_below?: number;
  /**
   * Include observations based on level of agreement among identifications:
   *
   * * **most_agree:** includes observations where there are more active identifications of taxa that agree with the Observation Taxon than active identifications that disagree with the Observation Taxon
   * * **some_agree:** includes observations where there are some active identifications of taxa that agree with the Observation Taxon
   * * **most_disagree:** includes observations where there are more active identifications of taxa that disagree with the Observation Taxon than active identifications that agree with the Observation Taxon
   */
  identifications?: "most_agree" | "most_disagree" | "some_agree";
  /** Include observations where there is disagreement among active identifications */
  disagreements?: boolean;
  /**
   * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
   * @format float
   * @min -90
   * @max 90
   */
  lat?: number;
  /**
   * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
   * @format float
   * @min -180
   * @max 180
   */
  lng?: number;
  /**
   * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
   * @format float
   */
  radius?: number;
  /**
   * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
   * @format float
   * @min -90
   * @max 90
   */
  nelat?: number;
  /**
   * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
   * @format float
   * @min -180
   * @max 180
   */
  nelng?: number;
  /**
   * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
   * @format float
   * @min -90
   * @max 90
   */
  swlat?: number;
  /**
   * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
   * @format float
   * @min -180
   * @max 180
   */
  swlng?: number;
  /** Include observations of taxa in a list with this ID */
  list_id?: number;
  /** Exclude observations added to the project this ID or slug */
  not_in_project?: string[];
  /** Exclude observations that match the rules of the project with this ID or slug */
  not_matching_project_rules_for?: string;
  /** Include observations with a description, tags, or place_guess matching this query. Can be combined with `search_on` */
  q?: string;
  /** Include observations where any of these properties match the value of the `q` parameter */
  search_on?:
    | "names"
    | "tags"
    | "description"
    | "place"
    | "taxon_page_obs_photos";
  /** Include observations with this quality grade */
  quality_grade?: ("casual" | "needs_id" | "research")[];
  /** Exclude observations that are casual for any reason other than being marked captive */
  not_casual_excluding_captive?: boolean;
  /** Exclude observations with this observation field */
  without_field?: string;
  /** Include observations with outlinks from this source */
  outlink_source?: string;
  /** Include observations updated since this time */
  updated_since?: string;
  /** Must be combined with the `reviewed` parameter */
  viewer_id?: number;
  /** Filter by observations reviewed by the user with ID matching the value of the `viewer_id` parameter */
  reviewed?: boolean;
  /** Filter by observations expected to occur nearby their location according to the latest iNaturalist Geomodel */
  expected_nearby?: boolean;
  /** Filter by observations voted as not accurately depicting an organism or scene */
  fails_dqa_accurate?: boolean;
  /** Filter by observations voted as not having an accurate date */
  fails_dqa_date?: boolean;
  /** Filter by observations voted as not evidence of an organism */
  fails_dqa_evidence?: boolean;
  /** Filter by observations voted as not having an accurate location */
  fails_dqa_location?: boolean;
  /** Filter by observations voted as the community ID cannot be improved */
  fails_dqa_needs_id?: boolean;
  /** Filter by observations voted as not recent evidence of an organism */
  fails_dqa_recent?: boolean;
  /** Filter by observations voted as not having evidence related to a single subject */
  fails_dqa_subject?: boolean;
  /** Filter by observations voted as not wild */
  fails_dqa_wild?: boolean;
  /** Include observations created by users created after a date. Accepts dates with or without times, e.g. 2025-01-01, as well as relative day, month, or year, e.g. 10d, 2w, 1y */
  user_after?: string;
  /** Include observations created by users created before a date. Accepts dates with or without times, e.g. 2025-01-01, as well as relative day, month, or year, e.g. 10d, 2w, 1y */
  user_before?: string;
  /** Returned taxon common names will be from this locale */
  locale?: string;
  /** Returned taxon common names will prioritize common names from this place */
  preferred_place_id?: number;
  /** Set the `Cache-Control` HTTP header with this value as `max-age`, in seconds. This means subsequent identical requests may be cached on  iNaturalist servers, and commonly within web browsers */
  ttl?: number;
  /**
   * Pagination `page` number
   * @min 0
   */
  page?: number;
  /** Number of results to return in a `page` */
  per_page?: number;
  /**
   * Sort order
   * @default "desc"
   */
  order?: "desc" | "asc";
  /**
   * Attribute to sort on
   * @default "created_at"
   */
  order_by?:
    | "created_at"
    | "geo_score"
    | "id"
    | "observed_on"
    | "random"
    | "species_guess"
    | "updated_at"
    | "votes";
  /** Include observations with this ID */
  only_id?: boolean;
  /**
   * Attribute fields to return in the response
   * @example "species_guess,observed_on"
   */
  fields?: any;
}

export interface ObservationsUpdate {
  fields?: any;
  /**
   * **NOTE: if `ignore_photos` is set to false, all photos will be removed from the observation**
   * @default true
   */
  ignore_photos?: boolean;
  observation?: {
    /** @format uuid */
    uuid?: string;
    captive_flag?: boolean;
    coordinate_system?: string;
    description?: string | null;
    /** @format float */
    geo_x?: number | null;
    /** @format float */
    geo_y?: number | null;
    geoprivacy?: string;
    /** @format float */
    latitude?: number | null;
    license?: string;
    location_is_exact?: boolean;
    /** @format float */
    longitude?: number | null;
    make_license_default?: boolean;
    make_licenses_same?: boolean;
    map_scale?: number;
    observation_field_values_attributes?: {
      observation_field_id: number;
      value: any;
    };
    observed_on_string?: string | null;
    owners_identification_from_vision?: boolean;
    place_guess?: string | null;
    /** @format float */
    positional_accuracy?: number | null;
    positioning_device?: string | null;
    positioning_method?: string | null;
    project_id?: number;
    prefers_community_taxon?: boolean;
    site_id?: number;
    /** The name of the organism observed. If the taxon ID is absent, iNat will try to choose a single taxon based on this string, but it may fail if there's some taxonomic amgiguity. */
    species_guess?: string | null;
    tag_list?: string | null;
    /** @format float */
    taxon_id?: number;
    /** @format float */
    taxon_name?: number;
    time_zone?: string;
  };
}

export interface ObservationsUpdates {
  /** ISO8601 datetime after which the update was created */
  created_after?: string;
  /**
   * When false this only returns updates that have not been viewed by the authenticated user. When true it returns all updates.
   * @default true
   */
  viewed?: boolean;
  /** Restrict to updates on observations by the authenticated user (owner) or on observations the authenticated user is following */
  observations_by?: "owner" | "following";
  page?: number;
  per_page?: number;
  fields?: any;
}

export interface PhotosCreate {
  /** @format binary */
  file: File;
  fields?: any;
  /** @format uuid */
  uuid?: string;
}

export interface PlacesNearby {
  /** @format float */
  nelat: number;
  /** @format float */
  nelng: number;
  /** @format float */
  swlat: number;
  /** @format float */
  swlng: number;
  name?: string;
  /** @format float */
  per_page?: number;
  fields?: any;
}

export interface PlacesSearch {
  q?: string;
  order_by?: "area";
  geo?: boolean;
  per_page?: number;
  fields?: any;
}

export interface PostsForUser {
  fields?: any;
  /** Include posts newer than the post with this ID */
  newer_than?: number;
  /** Include posts older than the post with this ID */
  older_than?: number;
  /**
   * @min 1
   * @default 1
   */
  page?: number;
  /**
   * @min 1
   * @max 200
   * @default 30
   */
  per_page?: number;
}

export interface ProjectObservationsCreate {
  fields?: any;
  project_observation?: {
    /** @min 1 */
    project_id: number;
    /** @format uuid */
    observation_id: string;
  };
}

export interface ProjectObservationsUpdate {
  fields?: any;
  project_observation?: {
    /** Whether the observer allows project curators to view the coordinates of this observation */
    prefers_curator_coordinate_access?: boolean;
  };
}

export interface ProjectUsersUpdate {
  project_user?: {
    prefers_curator_coordinate_access_for?: "none" | "any" | "taxon";
    prefers_updates?: boolean;
  };
}

export interface ProjectsFeature {
  /** @min 1 */
  inat_site_id?: number;
  noteworthy?: boolean;
}

export interface ProjectsMembers {
  /**
   * If counts are not needed, consider setting this to true to save on processing time, resulting in faster responses
   * @default false
   */
  skip_counts?: boolean;
  page?: number;
  per_page?: number;
  fields?: any;
  /** @default "observations_count" */
  order_by?: "observations_count" | "login";
}

export interface ProjectsSearch {
  q?: string;
  id?: number[];
  not_id?: number[];
  /**
   * @format float
   * @min -90
   * @max 90
   */
  lat?: number;
  /**
   * @format float
   * @min -180
   * @max 180
   */
  lng?: number;
  radius?: number;
  place_id?: number[];
  features?: boolean;
  noteworthy?: boolean;
  site_id?: number;
  rule_details?: boolean;
  type?: ("collection" | "umbrella")[];
  member_id?: number[];
  has_params?: boolean;
  has_posts?: boolean;
  page?: number;
  per_page?: number;
  order_by?: "recent_posts" | "created" | "updated" | "distance" | "featured";
  /**
   * Attribute fields to return in the response
   * @example "title,description"
   */
  fields?: any;
}

export interface ProjectsUnfeature {
  /** @min 1 */
  inat_site_id?: number;
}

export interface RelationshipsCreate {
  /** @example "all" */
  fields?: any;
  relationship: {
    /**
     *
     *         Sequential ID of the user that is the object of the relationship, i.e.
     *         the user that the authenticated user is establishing a relationship
     *         with
     *
     * @min 1
     */
    friend_id: number;
    /**
     * Whether the user trusts the friend with hidden coordinates
     * @default false
     */
    trust?: boolean;
    /**
     * Whether the user notifications about new content made by the friend
     * @default true
     */
    following?: boolean;
  };
}

export interface RelationshipsSearch {
  q?: string;
  /** Related user must have this ID */
  user_id?: number;
  /** Whether or not the user trusts the friend with hidden coordinates. */
  trusted?: "yes" | "no" | "any";
  /** Whether or not the user wants to see updates about new content from the friend. */
  following?: "yes" | "no" | "any";
  order?: "desc" | "asc";
  /** @default "users.login" */
  order_by?: "friendships.id" | "users.login";
  /**
   * Attribute fields to return in the response
   * @example "all"
   */
  fields?: any;
}

export interface RelationshipsUpdate {
  /** @example "all" */
  fields?: any;
  relationship: {
    /**
     * Whether the user trusts the friend with hidden coordinates
     * @default false
     */
    trust?: boolean;
    /**
     * Whether the user notifications about new content made by the friend
     * @default true
     */
    following?: boolean;
  };
}

export interface SavedLocationsCreate {
  fields?: any;
  saved_location: {
    /** @format float */
    latitude?: number;
    /** @format float */
    longitude?: number;
    title?: string;
    positional_accuracy?: number;
    geoprivacy?: "open" | "obscured" | "private";
  };
}

export interface SavedLocationsSearch {
  q?: string;
  page?: number;
  fields?: any;
}

export interface SoundsCreate {
  /** @format binary */
  file: File;
  fields?: any;
  /** @format uuid */
  uuid?: string;
}

export interface TaxaAutocomplete {
  q?: string;
  is_active?: boolean;
  iconic?: boolean;
  per_page?: number;
  locale?: string;
  preferred_place_id?: number;
  fields?: any;
}

export interface TaxaLifelistMetadata {
  observed_by_user_id: number | string;
  locale?: string;
  preferred_place_id?: number;
  fields?: any;
}

export interface TaxaSearch {
  q?: string;
  /** @default true */
  is_active?: boolean;
  iconic?: boolean;
  taxon_id?: number;
  parent_id?: number;
  rank?: (
    | "kingdom"
    | "phylum"
    | "subphylum"
    | "superclass"
    | "class"
    | "subclass"
    | "superorder"
    | "order"
    | "suborder"
    | "infraorder"
    | "superfamily"
    | "epifamily"
    | "family"
    | "subfamily"
    | "supertribe"
    | "tribe"
    | "subtribe"
    | "genus"
    | "genushybrid"
    | "species"
    | "hybrid"
    | "subspecies"
    | "variety"
    | "form"
  )[];
  rank_level?: number[];
  id_above?: number;
  id_below?: number;
  per_page?: number;
  locale?: string;
  preferred_place_id?: number;
  fields?: any;
}

export interface TaxaSuggest {
  /**
   * When `source` is `observations`, ignore this observation
   * @format uuid
   */
  featured_observation_id?: string;
  fields?: any;
  /**
   * image_url
   * URL for image to use when `source` is `visual`
   */
  image_url?: string;
  include_representative_photos?: boolean | string;
  /**
   * Number of results to return
   * @format float
   * @min 0
   */
  limit?: number;
  /**
   * Coordinate used when fetching nearby results `source` is `visual` or `*observations`
   * @format float
   * @min -90
   * @max 90
   */
  lat?: number;
  /**
   * Coordinate used when fetching nearby results `source` is `visual` or `*observations`
   * @format float
   * @min -180
   * @max 180
   */
  lng?: number;
  locale?: string;
  months?: string;
  /**
   *  Automatically set place and taxon filters based on this observation; this
   *       will override the values of `place_id` and `taxon_id` if these values
   *       can be derived from the observation
   *
   * @format uuid
   */
  observation_id?: string;
  /**
   *  Date the subject was observed (YYYY-MM-DD), used to refine suggestions to
   *       those observed at a similar time of year
   *
   */
  observed_on?: string;
  /**
   *  How the suggestions will be ordered. The default is to order by whatever default
   *       a source uses, e.g. the score when `source` is `visual`, or the number of
   *       observations (frequency) when the `source` is `*observations`. Ordering by
   *       `taxonomy` will group the results by their closeness in the taxonomic
   *       tree, but continue to use default ordering for siblings (e.g. species in the
   *       same genus).
   *
   */
  order_by?: "taxonomy" | "default" | "sciname";
  /**
   *  Only retrieve suggestions from this place when `source` is `checklist`
   *       or `*observations`
   *
   */
  place_id?: number;
  /**
   *  Coordinate used to set a place filter when source is `*observations` by
   *       choosing the place whose boundary contains the coordinate. Only chooses
   *       from places curated by staff (aka "standard" places) and only sets the
   *       place when lat, lng, and place_id are blank
   *
   * @format float
   * @min -90
   * @max 90
   */
  place_lat?: number;
  /**
   * See `place_lat`
   * @format float
   * @min -180
   * @max 180
   */
  place_lng?: number;
  /**
   *  Source of the suggestions. Note that different sources support different
   *       search parameters. See each parameter for details
   *
   */
  source?:
    | "captive_observations"
    | "checklist"
    | "misidentifications"
    | "observations"
    | "rg_observations"
    | "visual"
    | null;
  /**
   *  Only retrieve suggestions in this taxon. If taxon is below genus level it
   *       will be replaced with the genus that contains it. When `source` is
   *       `misidentifications`, suggestions will be species commonly misidentified
   *       as this taxon
   *
   */
  taxon_id?: number;
}

export interface TaxaWanted {
  page?: number;
  per_page?: number;
}

export interface TaxonIdSummariesSearch {
  /** Filter by active=true/false */
  active?: boolean;
  /** Group or groups; comma-separated in the query becomes an array here */
  taxon_group?: string | string[];
  /** Case-insensitive contains match on run_name */
  run_name?: string;
  /** Filter by one or more ISO language codes */
  language?: string | string[];
  /** Filter by one or more taxon IDs */
  taxon_id?: number[];
  /** Case-insensitive contains match on taxon_name */
  taxon_name?: string;
  /** YYYY-MM-DD. Records on this date (UTC day bucket) */
  run_generated_on?: string;
  /** ISO 8601. Records on/after this time */
  run_generated_d1?: string;
  /** ISO 8601. Records on/before this time */
  run_generated_d2?: string;
  created_on?: string;
  created_d1?: string;
  created_d2?: string;
  updated_on?: string;
  updated_d1?: string;
  updated_d2?: string;
  /** @default 1 */
  page?: number;
  /**
   * Max 200
   * @default 30
   */
  per_page?: number;
  /** @default "desc" */
  order?: "desc" | "asc";
  /** @default "updated_at" */
  order_by?: "run_generated_at" | "created_at" | "updated_at" | "taxon_id";
  /** Attribute fields to return in the response */
  fields?: any;
}

export interface TaxonNamePrioritiesCreate {
  fields?: any;
  taxon_name_priority: {
    place_id?: number | null;
    lexicon: string | null;
  };
}

export interface TaxonNamePrioritiesUpdate {
  fields?: any;
  taxon_name_priority: {
    position: number;
  };
}

export interface UsersAutocomplete {
  q?: string;
  /** @default false */
  include_suspended?: boolean;
  per_page?: number;
  fields?: any;
}

export interface UsersEmailAvailable {
  email: string;
}

export interface UsersIndex {
  fields?: any;
  /** @min 1 */
  page?: number;
  /**
   * @min 1
   * @max 200
   */
  per_page?: number;
  /**
   * Show users following this user, specified by sequential ID, username, or UUID
   * @example "1234"
   */
  following?: number | string;
  /**
   * Show users followed by this user, specified by sequential ID, username, or UUID
   * @example "1234"
   */
  followed_by?: number | string;
  /**
   * Show users with the specified orcid
   * @pattern ^[0-9]{4}(-[0-9]{4}){2}-[0-9]{3}[0-9X]$
   * @example "0000-0001-0002-0004"
   */
  orcid?: string;
}

export interface UsersProjects {
  page?: number;
  per_page?: number;
  fields?: any;
}

export interface UsersResetPassword {
  user?: {
    /** @format email */
    email: string;
  };
}

export interface UsersUpdate {
  user?: {
    /**
     *
     *         Whether the user consents to the transfer of their personal
     *         information to the United States. The only way to revoke this consent
     *         is to delete the account.
     *
     */
    data_transfer_consent?: boolean | null;
    description?: string | null;
    /**
     *
     *         Ordered list of IDs of projects the user has faved. Order of IDs in
     *         the array is the order in which they will be displayed
     *
     */
    faved_project_ids?: number[];
    email?: string;
    icon?: object | null;
    locale?: string | null;
    login?: string;
    /** Whether a change to `preferred_observation_license` should be apply to all the user's existing observations */
    make_observation_licenses_same?: boolean;
    /** Whether a change to `preferred_photo_license` should be apply to all the user's existing photos */
    make_photo_licenses_same?: boolean;
    /** Whether a change to `preferred_sound_license` should be apply to all the user's existing sounds */
    make_sound_licenses_same?: boolean;
    name?: string | null;
    /**
     *
     *         Whether the user consents to the storage of their personal
     *         information. The only way to revoke this consent is to delete the
     *         account.
     *
     */
    pi_consent?: boolean | null;
    /** ID of place for localizing common names */
    place_id?: number | null;
    preferred_observation_fields_by?: string;
    preferred_observation_license?: string | null;
    preferred_photo_license?: string | null;
    preferred_project_addition_by?: string;
    preferred_sound_license?: string | null;
    prefers_automatic_taxonomic_changes?: boolean;
    prefers_comment_email_notification?: boolean;
    prefers_common_names?: boolean;
    prefers_community_taxa?: boolean;
    prefers_identification_email_notification?: boolean;
    prefers_infraspecies_identification_notifications?: boolean;
    prefers_mention_email_notification?: boolean;
    prefers_message_email_notification?: boolean;
    prefers_monthly_supporter_badge?: boolean;
    prefers_no_email?: boolean;
    prefers_no_tracking?: boolean;
    prefers_non_disagreeing_identification_notifications?: boolean;
    prefers_project_added_your_observation_email_notification?: boolean;
    prefers_project_curator_change_email_notification?: boolean;
    prefers_project_journal_post_email_notification?: boolean;
    prefers_receive_mentions?: boolean;
    prefers_redundant_identification_notifications?: boolean;
    prefers_scientific_name_first?: boolean;
    prefers_taxon_change_email_notification?: boolean;
    prefers_taxon_or_place_observation_email_notification?: boolean;
    prefers_user_observation_email_notification?: boolean;
    /** ID of place for default observation searches */
    search_place_id?: number | null;
    site_id?: number | null;
    time_zone?: string | null;
    password?: string;
    password_confirmation?: string;
  };
  icon_delete?: boolean;
}

export interface UsersUpdateMultipart {
  /**
   *
   *         Whether the user consents to the transfer of their personal
   *         information to the United States. The only way to revoke this consent
   *         is to delete the account.
   *
   */
  "user[data_transfer_consent]"?: boolean | null;
  "user[description]"?: string | null;
  /**
   *
   *         Ordered list of IDs of projects the user has faved. Order of IDs in
   *         the array is the order in which they will be displayed
   *
   */
  "user[faved_project_ids]"?: number[];
  "user[email]"?: string;
  "user[locale]"?: string | null;
  "user[login]"?: string;
  /** Whether a change to `preferred_observation_license` should be apply to all the user's existing observations */
  "user[make_observation_licenses_same]"?: boolean;
  /** Whether a change to `preferred_photo_license` should be apply to all the user's existing photos */
  "user[make_photo_licenses_same]"?: boolean;
  /** Whether a change to `preferred_sound_license` should be apply to all the user's existing sounds */
  "user[make_sound_licenses_same]"?: boolean;
  "user[name]"?: string | null;
  /**
   *
   *         Whether the user consents to the storage of their personal
   *         information. The only way to revoke this consent is to delete the
   *         account.
   *
   */
  "user[pi_consent]"?: boolean | null;
  /** ID of place for localizing common names */
  "user[place_id]"?: number | null;
  "user[preferred_observation_fields_by]"?: string;
  "user[preferred_observation_license]"?: string | null;
  "user[preferred_photo_license]"?: string | null;
  "user[preferred_project_addition_by]"?: string;
  "user[preferred_sound_license]"?: string | null;
  "user[prefers_automatic_taxonomic_changes]"?: boolean;
  "user[prefers_comment_email_notification]"?: boolean;
  "user[prefers_common_names]"?: boolean;
  "user[prefers_community_taxa]"?: boolean;
  "user[prefers_identification_email_notification]"?: boolean;
  "user[prefers_infraspecies_identification_notifications]"?: boolean;
  "user[prefers_mention_email_notification]"?: boolean;
  "user[prefers_message_email_notification]"?: boolean;
  "user[prefers_monthly_supporter_badge]"?: boolean;
  "user[prefers_no_email]"?: boolean;
  "user[prefers_no_tracking]"?: boolean;
  "user[prefers_non_disagreeing_identification_notifications]"?: boolean;
  "user[prefers_project_added_your_observation_email_notification]"?: boolean;
  "user[prefers_project_curator_change_email_notification]"?: boolean;
  "user[prefers_project_journal_post_email_notification]"?: boolean;
  "user[prefers_receive_mentions]"?: boolean;
  "user[prefers_redundant_identification_notifications]"?: boolean;
  "user[prefers_scientific_name_first]"?: boolean;
  "user[prefers_taxon_change_email_notification]"?: boolean;
  "user[prefers_taxon_or_place_observation_email_notification]"?: boolean;
  "user[prefers_user_observation_email_notification]"?: boolean;
  /** ID of place for default observation searches */
  "user[search_place_id]"?: number | null;
  "user[site_id]"?: number | null;
  "user[time_zone]"?: string | null;
  "user[password]"?: string;
  "user[password_confirmation]"?: string;
  icon_delete?: boolean;
  /** @format binary */
  "user[icon]"?: File;
}

export interface UsersUpdateSession {
  prefers_hide_obs_show_identifiers?: boolean;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "https://api.inaturalist.org/v2";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.JsonApi]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) => {
      if (input instanceof FormData) {
        return input;
      }

      return Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData());
    },
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const responseToParse = responseFormat ? response.clone() : response;
      const data = !responseFormat
        ? r
        : await responseToParse[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title iNaturalist Version 2 API
 * @version 2.2.0
 * @baseUrl https://api.inaturalist.org/v2
 *
 * ## https://api.inaturalist.org/v2
 * [iNaturalist](https://www.inaturalist.org) is a global community of naturalists,
 * scientists, and members of the public sharing over a million wildlife sightings
 * to teach one another about the natural world while creating high quality citizen
 * science data for science and conservation.
 *
 * These API methods return data in JSON/JSONP and PNG response formats. Visit our
 * [developers page](https://www.inaturalist.org/pages/developers) for more
 * information. Write operations that expect and return JSON describe a single
 * `body` parameter that represents the request body, which should be specified
 * as JSON. See the "Model" of each body parameter for attributes that we
 * accept in these JSON objects.
 *
 * Multiple values for a single URL parameter should be separated by commas,
 * e.g. `taxon_id=1,2,3`.
 *
 * Map tiles are generated using the
 * [node-mapnik](https://github.com/mapnik/node-mapnik) library, following the
 * XYZ map tiling scheme. The "Observation Tile" methods accept nearly all the
 * parameters of the observation search APIs, and will generate map tiles
 * reflecting the same observations returned by searches. These
 * "Observation Tile" methods have corresponding
 * [UTFGrid](https://github.com/mapbox/utfgrid-spec) JSON
 * responses which return information needed to make interactive maps.
 *
 * Authentication in the Node API is handled via JSON Web Tokens (JWT). To
 * obtain one, make an [OAuth-authenticated
 * request](http://www.inaturalist.org/pages/api+reference#auth) to
 * <https://www.inaturalist.org/users/api_token>. Each JWT will expire after 24
 * hours. Authentication is required for all PUT and POST requests. Some GET
 * requests will also include private information like hidden coordinates if
 * the authenticated user has permission to view them.
 *
 * ## Specifying Response Fields
 *
 * By default, all endpoints will return a very minimal response for the requested
 * resources (e.g. the contents of the `results` array), usually just the UUID.
 * To receive more data, include the `fields` parameter to specify exactly what
 * you want from these resources. For GET requests, this can be as simple as
 * [https://api.inaturalist.org/v2/observations?fields=species_guess,observed_on](https://api.inaturalist.org/v2/observations?fields=species_guess,observed_on)
 * to return the `species_guess` and `observed_on` fields of the observations.
 *
 * For more complex responses, including nested objects, you have two options:
 *
 * ### RISON
 *
 * You can encode the fields parameter as [RISON](https://github.com/w33ble/rison-node),
 * a URL-friendly variant of JSON. If you want to request fields like
 *
 * ```json
 * {
 *   "species_guess": true,
 *   "user": {
 *     "login": true
 *   }
 * }
 * ```
 *
 * you can encode those fields as RISON:
 *
 * <https://api.inaturalist.org/v2/observations?fields=(species_guess:!t,user:(login:!t))>
 *
 * This is our preferred way to specify fields because it maintains the caching
 * benefits of URLs that are unique to their responses, and it avoids the
 * complexity of overriding the HTTP request method.
 *
 * ### X-HTTP-Method-Override
 *
 * If specifying the fields in RISON still results in a URL that is too large or
 * unwieldy, all GET endpoints also support POST requests with
 * the `X-HTTP-Method-Override: GET` header to so you can specify the response
 * fields in stringified JSON, e.g.
 *
 * ```
 *   curl -XPOST \
 *     -H "X-HTTP-Method-Override: GET" \
 *     -H "Content-Type: application/json" \
 *     -d '{"fields": {"species_guess": true, "user": {"login": true}}}' \
 *     "https://api.inaturalist.org/v2/observations"
 * ```
 *
 * When making `multipart/form-data` POST requests, you can still specify
 * `fields` as part of the form data, either as a commma-separated list of field
 * names or a JSON string.
 *
 * To see all available fields, you can use `fields=all`, e.g.
 * <https://api.inaturalist.org/v2/observations?fields=all>
 *
 * Photos served from https://static.inaturalist.org and
 * https://inaturalist-open-data.s3.amazonaws.com have multiple size
 * variants and not all size variants are returned in responses. To access
 * other sizes, the photo URL can be modified to replace only the size
 * qualifier (each variant shares the exact same extension). The domain a photo
 * is hosted under reflects the license under which the photo is being shared,
 * and the domain may change over time if the license changes. Photos in
 * the `inaturalist-open-data` domain are shared under open licenses. These can
 * be accessed in bulk in the [iNaturalist AWS Open Dataset](
 * https://registry.opendata.aws/inaturalist-open-data/). Photos in the
 * `static.inaturalist.org` domain do not have open licenses.
 *
 * The available photo sizes are:
 * * original (max 2048px in either dimension)
 * * large (max 1024px in either dimension)
 * * medium (max 500px in either dimension)
 * * small (max 240px in either dimension)
 * * thumb (max 100px in either dimension)
 * * square (75px square)
 *
 * ## About iNaturalist
 *
 * [iNaturalist](https://www.inaturalist.org/) is a global community of
 * naturalists, scientists, and members of the public sharing over a million
 * wildlife sightings to teach one another about the natural world while
 * creating high quality citizen science data for science and conservation.
 *
 * iNaturalist Website: <https://www.inaturalist.org/>
 *
 * Open Source Software: <https://github.com/inaturalist/>
 *
 * ## Terms of Use
 *
 * Use of this API is subject to the iNaturalist
 * [Terms of Service](https://www.inaturalist.org/terms) and
 * [Privacy Policy](https://www.inaturalist.org/privacy). We will block any
 * use of our API that violates our Terms or Privacy Policy without notice.
 * The API is intended to support application development, not data scraping.
 * For pre- generated data exports, see
 * <https://www.inaturalist.org/pages/developers>.
 *
 * Please note that we throttle API usage to a max of 100 requests per minute,
 * though we ask that you try to keep it to 60 requests per minute or lower,
 * and to keep under 10,000 requests per day. If we notice usage that has
 * serious impact on our performance we may institute blocks without
 * notification.
 *
 * Terms of Service: <https://www.inaturalist.org/terms>
 *
 * Privacy Policy: <https://www.inaturalist.org/privacy>
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  users = {
    /**
     * @description Updates attributes that persist for the duration of a user's session. Generally only relevant when using the iNaturalist website
     *
     * @tags Users
     * @name UpdateSessionUpdate
     * @summary Update session
     * @request PUT:/users/update_session
     * @secure
     */
    updateSessionUpdate: (
      query?: {
        prefers_hide_obs_show_identifiers?: "true" | "false";
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/users/update_session`,
        method: "PUT",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name ResetPasswordCreate
     * @summary Reset a user password
     * @request POST:/users/reset_password
     * @secure
     */
    resetPasswordCreate: (
      data: UsersResetPassword,
      params: RequestParams = {},
    ) =>
      this.request<void, Error>({
        path: `/users/reset_password`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name ResendConfirmationCreate
     * @summary Resend an email confirmation
     * @request POST:/users/resend_confirmation
     * @secure
     */
    resendConfirmationCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/resend_confirmation`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name RecentObservationFieldsList
     * @summary Fetch observation fields recently used by the logged-in user.
     * @request GET:/users/recent_observation_fields
     * @secure
     */
    recentObservationFieldsList: (
      query?: {
        fields?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultsObservationFields, Error>({
        path: `/users/recent_observation_fields`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name NotificationCountsList
     * @summary Fetch counts of unread notifications for the logged-in user.
     * @request GET:/users/notification_counts
     * @secure
     */
    notificationCountsList: (
      query?: {
        fields?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultsUsersNotificationCounts, Error>({
        path: `/users/notification_counts`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name GetUsers
     * @summary Fetch the logged-in user.
     * @request GET:/users/me
     * @secure
     */
    getUsers: (
      query?: {
        fields?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultsUsersMe, Error>({
        path: `/users/me`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name EmailAvailableList
     * @summary Check if email is available for account creation
     * @request GET:/users/email_available
     * @secure
     */
    emailAvailableList: (
      query: {
        fields?: string;
        email: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultsEmailAvailable, Error>({
        path: `/users/email_available`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name AutocompleteList
     * @summary Search users.
     * @request GET:/users/autocomplete
     * @secure
     */
    autocompleteList: (
      query?: {
        q?: string;
        include_suspended?: "true" | "false";
        per_page?: number;
        fields?: any;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultsUsers, any>({
        path: `/users/autocomplete`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersList
     * @summary List users
     * @request GET:/users
     */
    usersList: (
      query?: {
        fields?: any;
        /** @min 1 */
        page?: number;
        /**
         * @min 1
         * @max 200
         */
        per_page?: number;
        /**
         * Show users following this user, specified by sequential ID, username, or UUID
         * @example "1234"
         */
        following?: number | string;
        /**
         * Show users followed by this user, specified by sequential ID, username, or UUID
         * @example "1234"
         */
        followed_by?: number | string;
        /**
         * Show users with the specified orcid
         * @pattern ^[0-9]{4}(-[0-9]{4}){2}-[0-9]{3}[0-9X]$
         * @example "0000-0001-0002-0004"
         */
        orcid?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultsUsers, Error>({
        path: `/users`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name ProjectsList
     * @summary Return projects as user has joined / followed.
     * @request GET:/users/{id}/projects
     * @secure
     */
    projectsList: (
      id: number,
      query?: {
        page?: number;
        per_page?: number;
        fields?: any;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultsProjects, any>({
        path: `/users/${id}/projects`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name PostsList
     * @summary Fetch user posts
     * @request GET:/users/{id}/posts
     * @secure
     */
    postsList: (
      id: string[],
      query?: {
        page?: number;
        per_page?: number;
        fields?: any;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultsModelPosts, any>({
        path: `/users/${id}/posts`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name MuteCreate
     * @summary Mute a user
     * @request POST:/users/{id}/mute
     * @secure
     */
    muteCreate: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/${id}/mute`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name MuteDelete
     * @summary Remove a user mute
     * @request DELETE:/users/{id}/mute
     * @secure
     */
    muteDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/${id}/mute`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name BlockCreate
     * @summary Block a user
     * @request POST:/users/{id}/block
     * @secure
     */
    blockCreate: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/${id}/block`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name BlockDelete
     * @summary Remove a user block
     * @request DELETE:/users/{id}/block
     * @secure
     */
    blockDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/${id}/block`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersDetail
     * @summary Fetch users.
     * @request GET:/users/{id}
     * @secure
     */
    usersDetail: (
      id: string,
      query?: {
        fields?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultsUsers, Error>({
        path: `/users/${id}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersUpdate
     * @summary Update users.
     * @request PUT:/users/{id}
     * @secure
     */
    usersUpdate: (
      id: string,
      data: UsersUpdateMultipart,
      params: RequestParams = {},
    ) =>
      this.request<User, Error>({
        path: `/users/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  translations = {
    /**
     * No description
     *
     * @tags Translations
     * @name LocalesList
     * @summary Return site translated locales
     * @request GET:/translations/locales
     */
    localesList: (
      query?: {
        /** @default "locale,language_in_locale" */
        fields?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultsTranslationsLocales, Error>({
        path: `/translations/locales`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  taxonNamePriorities = {
    /**
     * No description
     *
     * @tags TaxonNamePriorities
     * @name TaxonNamePrioritiesCreate
     * @summary Create a taxon name priority
     * @request POST:/taxon_name_priorities
     * @secure
     */
    taxonNamePrioritiesCreate: (
      data: TaxonNamePrioritiesCreate,
      params: RequestParams = {},
    ) =>
      this.request<ResultsTaxonNamePriorities, any>({
        path: `/taxon_name_priorities`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TaxonNamePriorities
     * @name TaxonNamePrioritiesUpdate
     * @summary Update a taxon name priority
     * @request PUT:/taxon_name_priorities/{id}
     * @secure
     */
    taxonNamePrioritiesUpdate: (
      id: number,
      data: TaxonNamePrioritiesUpdate,
      params: RequestParams = {},
    ) =>
      this.request<ResultsTaxonNamePriorities, any>({
        path: `/taxon_name_priorities/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags TaxonNamePriorities
     * @name TaxonNamePrioritiesDelete
     * @summary Delete a taxon name priority
     * @request DELETE:/taxon_name_priorities/{id}
     * @secure
     */
    taxonNamePrioritiesDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/taxon_name_priorities/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  taxa = {
    /**
     * @description Retrieve automated identification suggestions for an observation or a set of filters like taxon and place
     *
     * @tags Taxa
     * @name SuggestList
     * @summary Suggest taxa for identifications given conditions
     * @request GET:/taxa/suggest
     * @secure
     */
    suggestList: (
      query?: {
        /**
         * When `source` is `observations`, ignore this observation
         * @format uuid
         */
        featured_observation_id?: string;
        fields?: any;
        /**
         * URL for image to use when `source` is `visual`
         * @format uri
         */
        image_url?: string;
        include_representative_photos?: boolean | string;
        /**
         * Number of results to return
         * @format float
         * @min 0
         */
        limit?: number;
        /**
         * Coordinate used when fetching nearby results `source` is `visual` or `*observations`
         * @format float
         * @min -90
         * @max 90
         */
        lat?: number;
        /**
         * Coordinate used when fetching nearby results `source` is `visual` or `*observations`
         * @format float
         * @min -180
         * @max 180
         */
        lng?: number;
        locale?: string;
        months?: string;
        /**
         *  Automatically set place and taxon filters based on this observation; this
         *       will override the values of `place_id` and `taxon_id` if these values
         *       can be derived from the observation
         *
         * @format uuid
         */
        observation_id?: string;
        /**
         *  Date the subject was observed (YYYY-MM-DD), used to refine suggestions to
         *       those observed at a similar time of year
         *
         */
        observed_on?: string;
        /**
         *  How the suggestions will be ordered. The default is to order by whatever default
         *       a source uses, e.g. the score when `source` is `visual`, or the number of
         *       observations (frequency) when the `source` is `*observations`. Ordering by
         *       `taxonomy` will group the results by their closeness in the taxonomic
         *       tree, but continue to use default ordering for siblings (e.g. species in the
         *       same genus).
         *
         */
        order_by?: "taxonomy" | "default" | "sciname";
        /**
         *  Only retrieve suggestions from this place when `source` is `checklist`
         *       or `*observations`
         *
         */
        place_id?: number;
        /**
         *  Coordinate used to set a place filter when source is `*observations` by
         *       choosing the place whose boundary contains the coordinate. Only chooses
         *       from places curated by staff (aka "standard" places) and only sets the
         *       place when lat, lng, and place_id are blank
         *
         * @format float
         * @min -90
         * @max 90
         */
        place_lat?: number;
        /**
         * See `place_lat`
         * @format float
         * @min -180
         * @max 180
         */
        place_lng?: number;
        /**
         *  Source of the suggestions. Note that different sources support different
         *       search parameters. See each parameter for details
         *
         */
        source?:
          | "captive_observations"
          | "checklist"
          | "misidentifications"
          | "observations"
          | "rg_observations"
          | "visual"
          | null;
        /**
         *  Only retrieve suggestions in this taxon. If taxon is below genus level it
         *       will be replaced with the genus that contains it. When `source` is
         *       `misidentifications`, suggestions will be species commonly misidentified
         *       as this taxon
         *
         */
        taxon_id?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultsTaxaSuggest, any>({
        path: `/taxa/suggest`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Just like its GET counterpart except it accepts an `image` parameter in a multipart POST request
     *
     * @tags Taxa
     * @name SuggestCreate
     * @summary Suggest taxa for identifications given conditions and an image
     * @request POST:/taxa/suggest
     * @secure
     */
    suggestCreate: (
      data: {
        /**
         * When `source` is `observations`, ignore this observation
         * @format uuid
         */
        featured_observation_id?: string;
        fields?: any;
        /**
         * image_url
         * URL for image to use when `source` is `visual`
         */
        image_url?: string;
        include_representative_photos?: boolean | string;
        /**
         * Number of results to return
         * @format float
         * @min 0
         */
        limit?: number;
        /**
         * Coordinate used when fetching nearby results `source` is `visual` or `*observations`
         * @format float
         * @min -90
         * @max 90
         */
        lat?: number;
        /**
         * Coordinate used when fetching nearby results `source` is `visual` or `*observations`
         * @format float
         * @min -180
         * @max 180
         */
        lng?: number;
        locale?: string;
        months?: string;
        /**
         *  Automatically set place and taxon filters based on this observation; this
         *       will override the values of `place_id` and `taxon_id` if these values
         *       can be derived from the observation
         *
         * @format uuid
         */
        observation_id?: string;
        /**
         *  Date the subject was observed (YYYY-MM-DD), used to refine suggestions to
         *       those observed at a similar time of year
         *
         */
        observed_on?: string;
        /**
         *  How the suggestions will be ordered. The default is to order by whatever default
         *       a source uses, e.g. the score when `source` is `visual`, or the number of
         *       observations (frequency) when the `source` is `*observations`. Ordering by
         *       `taxonomy` will group the results by their closeness in the taxonomic
         *       tree, but continue to use default ordering for siblings (e.g. species in the
         *       same genus).
         *
         */
        order_by?: "taxonomy" | "default" | "sciname";
        /**
         *  Only retrieve suggestions from this place when `source` is `checklist`
         *       or `*observations`
         *
         */
        place_id?: number;
        /**
         *  Coordinate used to set a place filter when source is `*observations` by
         *       choosing the place whose boundary contains the coordinate. Only chooses
         *       from places curated by staff (aka "standard" places) and only sets the
         *       place when lat, lng, and place_id are blank
         *
         * @format float
         * @min -90
         * @max 90
         */
        place_lat?: number;
        /**
         * See `place_lat`
         * @format float
         * @min -180
         * @max 180
         */
        place_lng?: number;
        /**
         *  Source of the suggestions. Note that different sources support different
         *       search parameters. See each parameter for details
         *
         */
        source?:
          | "captive_observations"
          | "checklist"
          | "misidentifications"
          | "observations"
          | "rg_observations"
          | "visual"
          | null;
        /**
         *  Only retrieve suggestions in this taxon. If taxon is below genus level it
         *       will be replaced with the genus that contains it. When `source` is
         *       `misidentifications`, suggestions will be species commonly misidentified
         *       as this taxon
         *
         */
        taxon_id?: number;
        /**
         * Image to use when `source` is `visual`
         * @format binary
         */
        image?: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultsTaxaSuggest, any>({
        path: `/taxa/suggest`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Taxa
     * @name LifelistMetadataList
     * @summary Fetch taxa metadata related to a users' observations
     * @request GET:/taxa/lifelist_metadata
     * @secure
     */
    lifelistMetadataList: (
      query: {
        observed_by_user_id: number | string;
        locale?: string;
        preferred_place_id?: number;
        fields?: any;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultsTaxaLifelistMetadata, any>({
        path: `/taxa/lifelist_metadata`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Taxa
     * @name IconicList
     * @summary Fetch iconic taxa.
     * @request GET:/taxa/iconic
     * @secure
     */
    iconicList: (
      query?: {
        fields?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultsTaxa, Error>({
        path: `/taxa/iconic`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Taxa
     * @name AutocompleteList
     * @summary Search taxa.
     * @request GET:/taxa/autocomplete
     * @secure
     */
    autocompleteList: (
      query?: {
        q?: string;
        is_active?: "true" | "false";
        iconic?: "true" | "false";
        per_page?: number;
        locale?: string;
        preferred_place_id?: number;
        fields?: any;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultsTaxa, any>({
        path: `/taxa/autocomplete`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Taxa
     * @name TaxaList
     * @summary Search taxa
     * @request GET:/taxa
     */
    taxaList: (
      query?: {
        q?: string;
        is_active?: "true" | "false";
        iconic?: "true" | "false";
        taxon_id?: number;
        parent_id?: number;
        rank?: (
          | "kingdom"
          | "phylum"
          | "subphylum"
          | "superclass"
          | "class"
          | "subclass"
          | "superorder"
          | "order"
          | "suborder"
          | "infraorder"
          | "superfamily"
          | "epifamily"
          | "family"
          | "subfamily"
          | "supertribe"
          | "tribe"
          | "subtribe"
          | "genus"
          | "genushybrid"
          | "species"
          | "hybrid"
          | "subspecies"
          | "variety"
          | "form"
        )[];
        rank_level?: number[];
        id_above?: number;
        id_below?: number;
        per_page?: number;
        locale?: string;
        preferred_place_id?: number;
        fields?: any;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultsTaxa, any>({
        path: `/taxa`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Taxa
     * @name WantedList
     * @summary Fetch unobserved taxa in a clade.
     * @request GET:/taxa/{id}/wanted
     * @secure
     */
    wantedList: (
      id: number,
      query?: {
        page?: number;
        per_page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultsTaxa, any>({
        path: `/taxa/${id}/wanted`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Taxa
     * @name MapLayersList
     * @summary Fetch information about which map layers are relevent for a taxon.
     * @request GET:/taxa/{id}/map_layers
     * @secure
     */
    mapLayersList: (
      id: number,
      query?: {
        page?: number;
        per_page?: number;
        fields?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultsTaxaMapLayers, any>({
        path: `/taxa/${id}/map_layers`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Taxa
     * @name TaxaDetail
     * @summary Fetch taxa.
     * @request GET:/taxa/{id}
     * @secure
     */
    taxaDetail: (
      id: number[],
      query?: {
        rank_level?: number[];
        fields?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultsTaxa, any>({
        path: `/taxa/${id}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  sounds = {
    /**
     * No description
     *
     * @tags Sounds
     * @name SoundsCreate
     * @summary Create sounds
     * @request POST:/sounds
     * @secure
     */
    soundsCreate: (
      data: {
        /** @format binary */
        file: File;
        fields?: any;
        /** @format uuid */
        uuid?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultsSounds, Error>({
        path: `/sounds`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),
  };
  sites = {
    /**
     * No description
     *
     * @tags Sites
     * @name SitesList
     * @summary List sites
     * @request GET:/sites
     */
    sitesList: (params: RequestParams = {}) =>
      this.request<ResultsSites, any>({
        path: `/sites`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  search = {
    /**
     * No description
     *
     * @tags Search
     * @name SearchList
     * @summary Search for multiple kinds of records
     * @request GET:/search
     * @secure
     */
    searchList: (
      query?: {
        /** Search query */
        q?: string;
        locale?: string;
        /** Integer ID for a place associated with results; only works for projects */
        place_id?: number;
        /** Localizes some response values for the given place */
        preferred_place_id?: number;
        /** Filters search results by record types. Can be specified as an array or a comma-separated list of values */
        sources?: ("places" | "projects" | "taxa" | "users")[];
        include_taxon_ancestors?: "true" | "false";
        page?: number;
        per_page?: number;
        /**
         * Attribute fields to return in the response
         * @default "place,project,taxon,user"
         * @example "species_guess,observed_on"
         */
        fields?: any;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultsSearch, Error>({
        path: `/search`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  savedLocations = {
    /**
     * No description
     *
     * @tags SavedLocations
     * @name SavedLocationsList
     * @summary Retrieve saved locations for the authenticated user
     * @request GET:/saved_locations
     * @secure
     */
    savedLocationsList: (
      query?: {
        q?: string;
        page?: number;
        fields?: any;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultsSavedLocations, Error>({
        path: `/saved_locations`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags SavedLocations
     * @name SavedLocationsCreate
     * @summary Create a saved location
     * @request POST:/saved_locations
     * @secure
     */
    savedLocationsCreate: (
      data: SavedLocationsCreate,
      params: RequestParams = {},
    ) =>
      this.request<ResultsSavedLocations, Error>({
        path: `/saved_locations`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags SavedLocations
     * @name SavedLocationsDelete
     * @summary Delete a saved location
     * @request DELETE:/saved_locations/{id}
     * @secure
     */
    savedLocationsDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/saved_locations/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  relationships = {
    /**
     * No description
     *
     * @tags Relationships
     * @name RelationshipsList
     * @summary Search relationships for the authenticated user
     * @request GET:/relationships
     * @secure
     */
    relationshipsList: (
      query?: {
        q?: string;
        /** Related user must have this ID */
        user_id?: number;
        /** Whether or not the user trusts the friend with hidden coordinates. */
        trusted?: "yes" | "no" | "any";
        /** Whether or not the user wants to see updates about new content from the friend. */
        following?: "yes" | "no" | "any";
        order?: "desc" | "asc";
        /** @default "users.login" */
        order_by?: "friendships.id" | "users.login";
        /**
         * Attribute fields to return in the response
         * @example "all"
         */
        fields?: any;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultsRelationships, Error>({
        path: `/relationships`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Relationships
     * @name RelationshipsCreate
     * @summary Create a relationship for the authenticated user
     * @request POST:/relationships
     * @secure
     */
    relationshipsCreate: (
      data: RelationshipsCreate,
      params: RequestParams = {},
    ) =>
      this.request<ResultsRelationships, any>({
        path: `/relationships`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Relationships
     * @name RelationshipsUpdate
     * @summary Update a relationship
     * @request PUT:/relationships/{id}
     * @secure
     */
    relationshipsUpdate: (
      id: number,
      data: RelationshipsUpdate,
      params: RequestParams = {},
    ) =>
      this.request<ResultsRelationships, any>({
        path: `/relationships/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Relationships
     * @name RelationshipsDelete
     * @summary Delete a relationship
     * @request DELETE:/relationships/{id}
     * @secure
     */
    relationshipsDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/relationships/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  providerAuthorizations = {
    /**
     * No description
     *
     * @tags ProviderAuthorizations
     * @name ProviderAuthorizationsList
     * @summary Third-party accounts the authenticated user has authorized iNat to access on their behalf
     * @request GET:/provider_authorizations
     * @secure
     */
    providerAuthorizationsList: (
      query?: {
        fields?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultsProviderAuthorizations, Error>({
        path: `/provider_authorizations`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ProviderAuthorizations
     * @name ProviderAuthorizationsDelete
     * @summary Revoke iNat's authorization to access the user's account on this provider's service
     * @request DELETE:/provider_authorizations/{id}
     * @secure
     */
    providerAuthorizationsDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, Error>({
        path: `/provider_authorizations/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  projects = {
    /**
     * No description
     *
     * @tags Projects
     * @name ProjectsList
     * @summary Search projects
     * @request GET:/projects
     */
    projectsList: (
      query?: {
        q?: string;
        id?: number[];
        not_id?: number[];
        /**
         * @format float
         * @min -90
         * @max 90
         */
        lat?: number;
        /**
         * @format float
         * @min -180
         * @max 180
         */
        lng?: number;
        radius?: number;
        place_id?: number[];
        features?: "true" | "false";
        noteworthy?: "true" | "false";
        site_id?: number;
        rule_details?: "true" | "false";
        type?: ("collection" | "umbrella")[];
        member_id?: number[];
        has_params?: "true" | "false";
        has_posts?: "true" | "false";
        page?: number;
        per_page?: number;
        order_by?:
          | "recent_posts"
          | "created"
          | "updated"
          | "distance"
          | "featured";
        /**
         * Attribute fields to return in the response
         * @example "title,description"
         */
        fields?: any;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultsProjects, any>({
        path: `/projects`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Projects
     * @name PostsList
     * @summary Fetch project posts
     * @request GET:/projects/{id}/posts
     * @secure
     */
    postsList: (
      id: string[],
      query?: {
        page?: number;
        per_page?: number;
        fields?: any;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultsModelPosts, any>({
        path: `/projects/${id}/posts`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Projects
     * @name MembershipList
     * @summary Membership of current user.
     * @request GET:/projects/{id}/membership
     * @secure
     */
    membershipList: (
      id: number[],
      query?: {
        fields?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultsProjectMembership, any>({
        path: `/projects/${id}/membership`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Projects
     * @name MembershipCreate
     * @summary Join a project
     * @request POST:/projects/{id}/membership
     * @secure
     */
    membershipCreate: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/projects/${id}/membership`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Projects
     * @name MembershipDelete
     * @summary Leave a project
     * @request DELETE:/projects/{id}/membership
     * @secure
     */
    membershipDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/projects/${id}/membership`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Projects
     * @name MembersList
     * @summary Fetch project members
     * @request GET:/projects/{id}/members
     * @secure
     */
    membersList: (
      id: number,
      query?: {
        /** If counts are not needed, consider setting this to true to save on processing time, resulting in faster responses */
        skip_counts?: "true" | "false";
        page?: number;
        per_page?: number;
        fields?: any;
        /** @default "observations_count" */
        order_by?: "observations_count" | "login";
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultsProjectsMembers, any>({
        path: `/projects/${id}/members`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Projects
     * @name ProjectsDetail
     * @summary Fetch projects
     * @request GET:/projects/{id}
     */
    projectsDetail: (
      id: number[],
      query?: {
        rule_details?: "true" | "false";
        fields?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultsProjects, any>({
        path: `/projects/${id}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  projectObservations = {
    /**
     * No description
     *
     * @tags ProjectObservations
     * @name ProjectObservationsCreate
     * @summary Add an observation to a project
     * @request POST:/project_observations
     * @secure
     */
    projectObservationsCreate: (
      data: ProjectObservationsCreate,
      params: RequestParams = {},
    ) =>
      this.request<ResultsProjectObservations, any>({
        path: `/project_observations`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ProjectObservations
     * @name ProjectObservationsUpdate
     * @summary Update a project observation
     * @request PUT:/project_observations/{uuid}
     * @secure
     */
    projectObservationsUpdate: (
      uuid: string,
      data: ProjectObservationsUpdate,
      params: RequestParams = {},
    ) =>
      this.request<ResultsProjectObservations, Error>({
        path: `/project_observations/${uuid}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ProjectObservations
     * @name ProjectObservationsDelete
     * @summary Delete a project observation
     * @request DELETE:/project_observations/{uuid}
     * @secure
     */
    projectObservationsDelete: (uuid: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/project_observations/${uuid}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  posts = {
    /**
     * No description
     *
     * @tags Posts
     * @name ForUserList
     * @summary Fetch posts
     * @request GET:/posts/for_user
     * @secure
     */
    forUserList: (
      query?: {
        fields?: any;
        /** Include posts newer than the post with this ID */
        newer_than?: number;
        /** Include posts older than the post with this ID */
        older_than?: number;
        /**
         * @min 1
         * @default 1
         */
        page?: number;
        /**
         * @min 1
         * @max 200
         * @default 30
         */
        per_page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultsPosts, any>({
        path: `/posts/for_user`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  places = {
    /**
     * No description
     *
     * @tags Places
     * @name NearbyList
     * @summary Fetch nearby places
     * @request GET:/places/nearby
     * @secure
     */
    nearbyList: (
      query?: {
        /** Filter by whether `positional_accuracy` is set or not */
        acc?: "true" | "false";
        /** Filter by captive / cultivated status */
        captive?: "true" | "false";
        /** Filter by whether the observation is in a place with a check list entry indicating the establishment means is `endemic` */
        endemic?: "true" | "false";
        /** Filter by observations that are georeferenced */
        geo?: "true" | "false";
        /** @deprecated */
        id_please?: "true" | "false";
        /** Filter by observations that have community identifications */
        identified?: "true" | "false";
        /** Filter by observations of taxa that are introduced in their location */
        introduced?: "true" | "false";
        /** Filter by observations that show on map tiles */
        mappable?: "true" | "false";
        /** Filter by observations of taxa that are native to their location */
        native?: "true" | "false";
        /** Filter by observations of taxa that outside their known ranges */
        out_of_range?: "true" | "false";
        /** @deprecated */
        pcid?: "true" | "false";
        /** Filter by observations with photos */
        photos?: "true" | "false";
        /** Filter by observations that have been favorited by at least one user */
        popular?: "true" | "false";
        /** Filter by observations with sounds */
        sounds?: "true" | "false";
        /** Filter by observations of active taxa */
        taxon_is_active?: "true" | "false";
        /** Filter by whether the observed taxon has a conservation status of "threatened" or worse */
        threatened?: "true" | "false";
        /** Filter by whether observations are 'verifiable' (i.e. have quality grades `research` or `needs_id`) */
        verifiable?: "true" | "false";
        /** Include observations with this ID */
        id?: (string | number)[];
        /** Exclude observations with this ID */
        not_id?: string[];
        /** Include observations with this license */
        license?: (
          | "cc-by"
          | "cc-by-nc"
          | "cc-by-nd"
          | "cc-by-sa"
          | "cc-by-nc-nd"
          | "cc-by-nc-sa"
          | "cc0"
        )[];
        /** Include observations with least one photo with this license */
        photo_license?: (
          | "cc-by"
          | "cc-by-nc"
          | "cc-by-nd"
          | "cc-by-sa"
          | "cc-by-nc-nd"
          | "cc-by-nc-sa"
          | "cc0"
        )[];
        /** Include observations where the license attribute is not null, i.e. it is licensed */
        licensed?: "true" | "false";
        /** Include observations with at least one photo with a license attribute that is not null */
        photo_licensed?: "true" | "false";
        /** Include observations observed within the place with this ID */
        place_id?: (string | number)[];
        /** Include observations added to the project with this ID or slug */
        project_id?: (number | string)[];
        /** Filter by observers who trust the project(s) specified in `project_id` OR trust the authenticated viewer */
        coords_viewable_for_proj?: "true" | "false";
        /** Include observations of taxa with this rank */
        rank?: (
          | "stateofmatter"
          | "kingdom"
          | "phylum"
          | "subphylum"
          | "superclass"
          | "class"
          | "subclass"
          | "infraclass"
          | "subterclass"
          | "superorder"
          | "order"
          | "suborder"
          | "infraorder"
          | "parvorder"
          | "zoosection"
          | "zoosubsection"
          | "superfamily"
          | "epifamily"
          | "family"
          | "subfamily"
          | "supertribe"
          | "tribe"
          | "subtribe"
          | "genus"
          | "genushybrid"
          | "subgenus"
          | "section"
          | "subsection"
          | "complex"
          | "species"
          | "hybrid"
          | "subspecies"
          | "variety"
          | "form"
          | "infrahybrid"
        )[];
        /** Include observations affiliated with the iNaturalist network website with this ID */
        site_id?: number[];
        /** Include observations that have at least one sound with this license */
        sound_license?: (
          | "cc-by"
          | "cc-by-nc"
          | "cc-by-nd"
          | "cc-by-sa"
          | "cc-by-nc-nd"
          | "cc-by-nc-sa"
          | "cc0"
        )[];
        /** Include observations of this taxon and its descendants */
        taxon_id?: number[];
        /** Exclude observations of this taxon and its descendants */
        without_taxon_id?: number[];
        /** Include observations of taxa that have a scientific or common name matching this string */
        taxon_name?: string;
        /** Include observations observed by users that have this ID or login */
        user_id?: string[];
        /** Include observations observed by users that have this login */
        user_login?: string[];
        /** Include observations observed within this hour of the day */
        hour?: number[];
        /** Include observations observed within this day of the month */
        day?: number[];
        /** Include observations observed within this month */
        month?: number[];
        /** Include observations observed within this year */
        year?: number[];
        /** Include observations created within this day of the month */
        created_day?: number[];
        /** Include observations created within this month */
        created_month?: number[];
        /** Include observations created within this year */
        created_year?: number[];
        /** Include observations with annotations using this controlled term ID */
        term_id?: number[];
        /** Include observations with annotations using this controlled value ID. Must be combined with the `term_id` parameter */
        term_value_id?: number[];
        /** Exclude observations with annotations using this controlled value ID. Must be combined with the `term_id` parameter */
        without_term_value_id?: number[];
        /** Include observations with annotations using this controlled term ID and associated term value IDs, or be missing annotations using this controlled term ID. Must be combined with the `term_value_id` or `without_term_value_id` parameters */
        term_id_or_unknown?: number[];
        /** Include observations with an annotation created by this user */
        annotation_user_id?: string[];
        /** Include observations with a positional accuracy above this value (meters) */
        acc_above?: number;
        /** Include observations with a positional accuracy below this value (meters) */
        acc_below?: number;
        /** Include observations with a positional accuracy below this value (in meters) or with an unknown positional accuracy */
        acc_below_or_unknown?: number;
        /** Include observations observed on or after this date/time */
        d1?: string;
        /** Include observations observed on or before this date/time */
        d2?: string;
        /** Include observations created on or after this date/time */
        created_d1?: string;
        /** Include observations created on or before this date/time */
        created_d2?: string;
        /** Include observations created on this date */
        created_on?: string;
        /** Include observations observed on this date */
        observed_on?: string;
        /** Exclude observations of taxa previously observed by this user */
        unobserved_by_user_id?: string;
        /** Include observations that match the rules of the project with this ID or slug */
        apply_project_rules_for?: string;
        /** Include observations included in this observation accuracy experiment */
        observation_accuracy_experiment_id?: number[];
        /** Include observations of taxa that have this conservation status code. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
        cs?: string;
        /** Include observations of taxa that have a conservation status from this authority. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
        csa?: string;
        /** Include observations of taxa that have this IUCN conservation status. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
        csi?: ("LC" | "NT" | "VU" | "EN" | "CR" | "EW" | "EX")[];
        /** Include observations with this geoprivacy setting */
        geoprivacy?: ("obscured" | "obscured_private" | "open" | "private")[];
        /** Include observations where this is the most conservative geoprivacy applied by a conservation status associated with one of the taxa proposed in the current identifications */
        taxon_geoprivacy?: (
          | "obscured"
          | "obscured_private"
          | "open"
          | "private"
        )[];
        /** Include observations where `geoprivacy` or `taxon_geoprivacy` match these values */
        obscuration?: ("obscured" | "private" | "none")[];
        /** Include observations of taxa with this rank or lower */
        hrank?: (
          | "stateofmatter"
          | "kingdom"
          | "phylum"
          | "subphylum"
          | "superclass"
          | "class"
          | "subclass"
          | "infraclass"
          | "subterclass"
          | "superorder"
          | "order"
          | "suborder"
          | "infraorder"
          | "parvorder"
          | "zoosection"
          | "zoosubsection"
          | "superfamily"
          | "epifamily"
          | "family"
          | "subfamily"
          | "supertribe"
          | "tribe"
          | "subtribe"
          | "genus"
          | "genushybrid"
          | "subgenus"
          | "section"
          | "subsection"
          | "complex"
          | "species"
          | "hybrid"
          | "subspecies"
          | "variety"
          | "form"
          | "infrahybrid"
        )[];
        /** Include observations of taxa with this rank or higher */
        lrank?: (
          | "stateofmatter"
          | "kingdom"
          | "phylum"
          | "subphylum"
          | "superclass"
          | "class"
          | "subclass"
          | "infraclass"
          | "subterclass"
          | "superorder"
          | "order"
          | "suborder"
          | "infraorder"
          | "parvorder"
          | "zoosection"
          | "zoosubsection"
          | "superfamily"
          | "epifamily"
          | "family"
          | "subfamily"
          | "supertribe"
          | "tribe"
          | "subtribe"
          | "genus"
          | "genushybrid"
          | "subgenus"
          | "section"
          | "subsection"
          | "complex"
          | "species"
          | "hybrid"
          | "subspecies"
          | "variety"
          | "form"
          | "infrahybrid"
        )[];
        /** Include observations of taxa within this iconic taxon */
        iconic_taxa?: (
          | "Actinopterygii"
          | "Animalia"
          | "Amphibia"
          | "Arachnida"
          | "Aves"
          | "Chromista"
          | "Fungi"
          | "Insecta"
          | "Mammalia"
          | "Mollusca"
          | "Reptilia"
          | "Plantae"
          | "Protozoa"
          | "unknown"
        )[];
        /** Include observations with an ID above this value */
        id_above?: number;
        /** Include observations with an ID below this value */
        id_below?: number;
        /**
         * Include observations based on level of agreement among identifications:
         *
         * * **most_agree:** includes observations where there are more active identifications of taxa that agree with the Observation Taxon than active identifications that disagree with the Observation Taxon
         * * **some_agree:** includes observations where there are some active identifications of taxa that agree with the Observation Taxon
         * * **most_disagree:** includes observations where there are more active identifications of taxa that disagree with the Observation Taxon than active identifications that agree with the Observation Taxon
         */
        identifications?: "most_agree" | "most_disagree" | "some_agree";
        /** Include observations where there is disagreement among active identifications */
        disagreements?: "true" | "false";
        /**
         * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
         * @format float
         * @min -90
         * @max 90
         */
        lat?: number;
        /**
         * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
         * @format float
         * @min -180
         * @max 180
         */
        lng?: number;
        /**
         * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
         * @format float
         */
        radius?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -90
         * @max 90
         */
        nelat?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -180
         * @max 180
         */
        nelng?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -90
         * @max 90
         */
        swlat?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -180
         * @max 180
         */
        swlng?: number;
        /** Include observations of taxa in a list with this ID */
        list_id?: number;
        /** Exclude observations added to the project this ID or slug */
        not_in_project?: string[];
        /** Exclude observations that match the rules of the project with this ID or slug */
        not_matching_project_rules_for?: string;
        /** Include observations with a description, tags, or place_guess matching this query. Can be combined with `search_on` */
        q?: string;
        /** Include observations where any of these properties match the value of the `q` parameter */
        search_on?:
          | "names"
          | "tags"
          | "description"
          | "place"
          | "taxon_page_obs_photos";
        /** Include observations with this quality grade */
        quality_grade?: ("casual" | "needs_id" | "research")[];
        /** Exclude observations that are casual for any reason other than being marked captive */
        not_casual_excluding_captive?: "true" | "false";
        /** Exclude observations with this observation field */
        without_field?: string;
        /** Include observations with outlinks from this source */
        outlink_source?: string;
        /** Include observations updated since this time */
        updated_since?: string;
        /** Must be combined with the `reviewed` parameter */
        viewer_id?: number;
        /** Filter by observations reviewed by the user with ID matching the value of the `viewer_id` parameter */
        reviewed?: "true" | "false";
        /** Filter by observations expected to occur nearby their location according to the latest iNaturalist Geomodel */
        expected_nearby?: "true" | "false";
        /** Filter by observations voted as not accurately depicting an organism or scene */
        fails_dqa_accurate?: "true" | "false";
        /** Filter by observations voted as not having an accurate date */
        fails_dqa_date?: "true" | "false";
        /** Filter by observations voted as not evidence of an organism */
        fails_dqa_evidence?: "true" | "false";
        /** Filter by observations voted as not having an accurate location */
        fails_dqa_location?: "true" | "false";
        /** Filter by observations voted as the community ID cannot be improved */
        fails_dqa_needs_id?: "true" | "false";
        /** Filter by observations voted as not recent evidence of an organism */
        fails_dqa_recent?: "true" | "false";
        /** Filter by observations voted as not having evidence related to a single subject */
        fails_dqa_subject?: "true" | "false";
        /** Filter by observations voted as not wild */
        fails_dqa_wild?: "true" | "false";
        /** Include observations created by users created after a date. Accepts dates with or without times, e.g. 2025-01-01, as well as relative day, month, or year, e.g. 10d, 2w, 1y */
        user_after?: string;
        /** Include observations created by users created before a date. Accepts dates with or without times, e.g. 2025-01-01, as well as relative day, month, or year, e.g. 10d, 2w, 1y */
        user_before?: string;
        /** Returned taxon common names will be from this locale */
        locale?: string;
        /** Returned taxon common names will prioritize common names from this place */
        preferred_place_id?: number;
        /** Set the `Cache-Control` HTTP header with this value as `max-age`, in seconds. This means subsequent identical requests may be cached on  iNaturalist servers, and commonly within web browsers */
        ttl?: number;
        /**
         * Pagination `page` number
         * @min 0
         */
        page?: number;
        /** Number of results to return in a `page` */
        per_page?: number;
        /**
         * Sort order
         * @default "desc"
         */
        order?: "desc" | "asc";
        /**
         * Attribute to sort on
         * @default "created_at"
         */
        order_by?:
          | "created_at"
          | "geo_score"
          | "id"
          | "observed_on"
          | "random"
          | "species_guess"
          | "updated_at"
          | "votes";
        /** Include observations with this ID */
        only_id?: "true" | "false";
        /**
         * Attribute fields to return in the response
         * @example "species_guess,observed_on"
         */
        fields?: any;
        /** @default "observed" */
        date_field?: "observed" | "created";
        /** @default "month_of_year" */
        interval?:
          | "year"
          | "month"
          | "week"
          | "day"
          | "hour"
          | "month_of_year"
          | "week_of_year";
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultsPlacesNearby, any>({
        path: `/places/nearby`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Places
     * @name PlacesList
     * @summary Search places
     * @request GET:/places
     */
    placesList: (
      query?: {
        q?: string;
        order_by?: "area";
        geo?: "true" | "false";
        per_page?: number;
        fields?: any;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultsPlaces, any>({
        path: `/places`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Places
     * @name PlacesDetail
     * @summary Fetch places
     * @request GET:/places/{uuid}
     */
    placesDetail: (
      uuid: string[],
      query?: {
        /** Latitude of coordinate used to sort results by distance */
        lat?: string;
        /** Longitude of coordinate used to sort results by distance */
        lng?: string;
        /** Order results by admin level and distance from a point specified in lat and lng */
        order_by?: "admin_and_distance";
        fields?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultsPlaces, any>({
        path: `/places/${uuid}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Polygon Tiles
     * @name PngList
     * @summary Place Tiles
     * @request GET:/places/{id}/{zoom}/{x}/{y}.png
     * @secure
     */
    pngList: (
      id: string,
      zoom: number,
      x: number,
      y: number,
      query?: {
        tile_size?: 256 | 512;
        /** Filter by whether `positional_accuracy` is set or not */
        acc?: "true" | "false";
        /** Filter by captive / cultivated status */
        captive?: "true" | "false";
        /** Filter by whether the observation is in a place with a check list entry indicating the establishment means is `endemic` */
        endemic?: "true" | "false";
        /** Filter by observations that are georeferenced */
        geo?: "true" | "false";
        /** @deprecated */
        id_please?: "true" | "false";
        /** Filter by observations that have community identifications */
        identified?: "true" | "false";
        /** Filter by observations of taxa that are introduced in their location */
        introduced?: "true" | "false";
        /** Filter by observations that show on map tiles */
        mappable?: "true" | "false";
        /** Filter by observations of taxa that are native to their location */
        native?: "true" | "false";
        /** Filter by observations of taxa that outside their known ranges */
        out_of_range?: "true" | "false";
        /** @deprecated */
        pcid?: "true" | "false";
        /** Filter by observations with photos */
        photos?: "true" | "false";
        /** Filter by observations that have been favorited by at least one user */
        popular?: "true" | "false";
        /** Filter by observations with sounds */
        sounds?: "true" | "false";
        /** Filter by observations of active taxa */
        taxon_is_active?: "true" | "false";
        /** Filter by whether the observed taxon has a conservation status of "threatened" or worse */
        threatened?: "true" | "false";
        /** Filter by whether observations are 'verifiable' (i.e. have quality grades `research` or `needs_id`) */
        verifiable?: "true" | "false";
        /** Exclude observations with this ID */
        not_id?: string[];
        /** Include observations with this license */
        license?: (
          | "cc-by"
          | "cc-by-nc"
          | "cc-by-nd"
          | "cc-by-sa"
          | "cc-by-nc-nd"
          | "cc-by-nc-sa"
          | "cc0"
        )[];
        /** Include observations with least one photo with this license */
        photo_license?: (
          | "cc-by"
          | "cc-by-nc"
          | "cc-by-nd"
          | "cc-by-sa"
          | "cc-by-nc-nd"
          | "cc-by-nc-sa"
          | "cc0"
        )[];
        /** Include observations where the license attribute is not null, i.e. it is licensed */
        licensed?: "true" | "false";
        /** Include observations with at least one photo with a license attribute that is not null */
        photo_licensed?: "true" | "false";
        /** Include observations observed within the place with this ID */
        place_id?: (string | number)[];
        /** Include observations added to the project with this ID or slug */
        project_id?: (number | string)[];
        /** Filter by observers who trust the project(s) specified in `project_id` OR trust the authenticated viewer */
        coords_viewable_for_proj?: "true" | "false";
        /** Include observations of taxa with this rank */
        rank?: (
          | "stateofmatter"
          | "kingdom"
          | "phylum"
          | "subphylum"
          | "superclass"
          | "class"
          | "subclass"
          | "infraclass"
          | "subterclass"
          | "superorder"
          | "order"
          | "suborder"
          | "infraorder"
          | "parvorder"
          | "zoosection"
          | "zoosubsection"
          | "superfamily"
          | "epifamily"
          | "family"
          | "subfamily"
          | "supertribe"
          | "tribe"
          | "subtribe"
          | "genus"
          | "genushybrid"
          | "subgenus"
          | "section"
          | "subsection"
          | "complex"
          | "species"
          | "hybrid"
          | "subspecies"
          | "variety"
          | "form"
          | "infrahybrid"
        )[];
        /** Include observations affiliated with the iNaturalist network website with this ID */
        site_id?: number[];
        /** Include observations that have at least one sound with this license */
        sound_license?: (
          | "cc-by"
          | "cc-by-nc"
          | "cc-by-nd"
          | "cc-by-sa"
          | "cc-by-nc-nd"
          | "cc-by-nc-sa"
          | "cc0"
        )[];
        /** Include observations of this taxon and its descendants */
        taxon_id?: number[];
        /** Exclude observations of this taxon and its descendants */
        without_taxon_id?: number[];
        /** Include observations of taxa that have a scientific or common name matching this string */
        taxon_name?: string;
        /** Include observations observed by users that have this ID or login */
        user_id?: string[];
        /** Include observations observed by users that have this login */
        user_login?: string[];
        /** Include observations observed within this hour of the day */
        hour?: number[];
        /** Include observations observed within this day of the month */
        day?: number[];
        /** Include observations observed within this month */
        month?: number[];
        /** Include observations observed within this year */
        year?: number[];
        /** Include observations created within this day of the month */
        created_day?: number[];
        /** Include observations created within this month */
        created_month?: number[];
        /** Include observations created within this year */
        created_year?: number[];
        /** Include observations with annotations using this controlled term ID */
        term_id?: number[];
        /** Include observations with annotations using this controlled value ID. Must be combined with the `term_id` parameter */
        term_value_id?: number[];
        /** Exclude observations with annotations using this controlled value ID. Must be combined with the `term_id` parameter */
        without_term_value_id?: number[];
        /** Include observations with annotations using this controlled term ID and associated term value IDs, or be missing annotations using this controlled term ID. Must be combined with the `term_value_id` or `without_term_value_id` parameters */
        term_id_or_unknown?: number[];
        /** Include observations with an annotation created by this user */
        annotation_user_id?: string[];
        /** Include observations with a positional accuracy above this value (meters) */
        acc_above?: number;
        /** Include observations with a positional accuracy below this value (meters) */
        acc_below?: number;
        /** Include observations with a positional accuracy below this value (in meters) or with an unknown positional accuracy */
        acc_below_or_unknown?: number;
        /** Include observations observed on or after this date/time */
        d1?: string;
        /** Include observations observed on or before this date/time */
        d2?: string;
        /** Include observations created on or after this date/time */
        created_d1?: string;
        /** Include observations created on or before this date/time */
        created_d2?: string;
        /** Include observations created on this date */
        created_on?: string;
        /** Include observations observed on this date */
        observed_on?: string;
        /** Exclude observations of taxa previously observed by this user */
        unobserved_by_user_id?: string;
        /** Include observations that match the rules of the project with this ID or slug */
        apply_project_rules_for?: string;
        /** Include observations included in this observation accuracy experiment */
        observation_accuracy_experiment_id?: number[];
        /** Include observations of taxa that have this conservation status code. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
        cs?: string;
        /** Include observations of taxa that have a conservation status from this authority. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
        csa?: string;
        /** Include observations of taxa that have this IUCN conservation status. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
        csi?: ("LC" | "NT" | "VU" | "EN" | "CR" | "EW" | "EX")[];
        /** Include observations with this geoprivacy setting */
        geoprivacy?: ("obscured" | "obscured_private" | "open" | "private")[];
        /** Include observations where this is the most conservative geoprivacy applied by a conservation status associated with one of the taxa proposed in the current identifications */
        taxon_geoprivacy?: (
          | "obscured"
          | "obscured_private"
          | "open"
          | "private"
        )[];
        /** Include observations where `geoprivacy` or `taxon_geoprivacy` match these values */
        obscuration?: ("obscured" | "private" | "none")[];
        /** Include observations of taxa with this rank or lower */
        hrank?: (
          | "stateofmatter"
          | "kingdom"
          | "phylum"
          | "subphylum"
          | "superclass"
          | "class"
          | "subclass"
          | "infraclass"
          | "subterclass"
          | "superorder"
          | "order"
          | "suborder"
          | "infraorder"
          | "parvorder"
          | "zoosection"
          | "zoosubsection"
          | "superfamily"
          | "epifamily"
          | "family"
          | "subfamily"
          | "supertribe"
          | "tribe"
          | "subtribe"
          | "genus"
          | "genushybrid"
          | "subgenus"
          | "section"
          | "subsection"
          | "complex"
          | "species"
          | "hybrid"
          | "subspecies"
          | "variety"
          | "form"
          | "infrahybrid"
        )[];
        /** Include observations of taxa with this rank or higher */
        lrank?: (
          | "stateofmatter"
          | "kingdom"
          | "phylum"
          | "subphylum"
          | "superclass"
          | "class"
          | "subclass"
          | "infraclass"
          | "subterclass"
          | "superorder"
          | "order"
          | "suborder"
          | "infraorder"
          | "parvorder"
          | "zoosection"
          | "zoosubsection"
          | "superfamily"
          | "epifamily"
          | "family"
          | "subfamily"
          | "supertribe"
          | "tribe"
          | "subtribe"
          | "genus"
          | "genushybrid"
          | "subgenus"
          | "section"
          | "subsection"
          | "complex"
          | "species"
          | "hybrid"
          | "subspecies"
          | "variety"
          | "form"
          | "infrahybrid"
        )[];
        /** Include observations of taxa within this iconic taxon */
        iconic_taxa?: (
          | "Actinopterygii"
          | "Animalia"
          | "Amphibia"
          | "Arachnida"
          | "Aves"
          | "Chromista"
          | "Fungi"
          | "Insecta"
          | "Mammalia"
          | "Mollusca"
          | "Reptilia"
          | "Plantae"
          | "Protozoa"
          | "unknown"
        )[];
        /** Include observations with an ID above this value */
        id_above?: number;
        /** Include observations with an ID below this value */
        id_below?: number;
        /**
         * Include observations based on level of agreement among identifications:
         *
         * * **most_agree:** includes observations where there are more active identifications of taxa that agree with the Observation Taxon than active identifications that disagree with the Observation Taxon
         * * **some_agree:** includes observations where there are some active identifications of taxa that agree with the Observation Taxon
         * * **most_disagree:** includes observations where there are more active identifications of taxa that disagree with the Observation Taxon than active identifications that agree with the Observation Taxon
         */
        identifications?: "most_agree" | "most_disagree" | "some_agree";
        /** Include observations where there is disagreement among active identifications */
        disagreements?: "true" | "false";
        /**
         * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
         * @format float
         * @min -90
         * @max 90
         */
        lat?: number;
        /**
         * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
         * @format float
         * @min -180
         * @max 180
         */
        lng?: number;
        /**
         * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
         * @format float
         */
        radius?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -90
         * @max 90
         */
        nelat?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -180
         * @max 180
         */
        nelng?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -90
         * @max 90
         */
        swlat?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -180
         * @max 180
         */
        swlng?: number;
        /** Include observations of taxa in a list with this ID */
        list_id?: number;
        /** Exclude observations added to the project this ID or slug */
        not_in_project?: string[];
        /** Exclude observations that match the rules of the project with this ID or slug */
        not_matching_project_rules_for?: string;
        /** Include observations with a description, tags, or place_guess matching this query. Can be combined with `search_on` */
        q?: string;
        /** Include observations where any of these properties match the value of the `q` parameter */
        search_on?:
          | "names"
          | "tags"
          | "description"
          | "place"
          | "taxon_page_obs_photos";
        /** Include observations with this quality grade */
        quality_grade?: ("casual" | "needs_id" | "research")[];
        /** Exclude observations that are casual for any reason other than being marked captive */
        not_casual_excluding_captive?: "true" | "false";
        /** Exclude observations with this observation field */
        without_field?: string;
        /** Include observations with outlinks from this source */
        outlink_source?: string;
        /** Include observations updated since this time */
        updated_since?: string;
        /** Must be combined with the `reviewed` parameter */
        viewer_id?: number;
        /** Filter by observations reviewed by the user with ID matching the value of the `viewer_id` parameter */
        reviewed?: "true" | "false";
        /** Filter by observations expected to occur nearby their location according to the latest iNaturalist Geomodel */
        expected_nearby?: "true" | "false";
        /** Filter by observations voted as not accurately depicting an organism or scene */
        fails_dqa_accurate?: "true" | "false";
        /** Filter by observations voted as not having an accurate date */
        fails_dqa_date?: "true" | "false";
        /** Filter by observations voted as not evidence of an organism */
        fails_dqa_evidence?: "true" | "false";
        /** Filter by observations voted as not having an accurate location */
        fails_dqa_location?: "true" | "false";
        /** Filter by observations voted as the community ID cannot be improved */
        fails_dqa_needs_id?: "true" | "false";
        /** Filter by observations voted as not recent evidence of an organism */
        fails_dqa_recent?: "true" | "false";
        /** Filter by observations voted as not having evidence related to a single subject */
        fails_dqa_subject?: "true" | "false";
        /** Filter by observations voted as not wild */
        fails_dqa_wild?: "true" | "false";
        /** Include observations created by users created after a date. Accepts dates with or without times, e.g. 2025-01-01, as well as relative day, month, or year, e.g. 10d, 2w, 1y */
        user_after?: string;
        /** Include observations created by users created before a date. Accepts dates with or without times, e.g. 2025-01-01, as well as relative day, month, or year, e.g. 10d, 2w, 1y */
        user_before?: string;
        /** Returned taxon common names will be from this locale */
        locale?: string;
        /** Returned taxon common names will prioritize common names from this place */
        preferred_place_id?: number;
        /** Set the `Cache-Control` HTTP header with this value as `max-age`, in seconds. This means subsequent identical requests may be cached on  iNaturalist servers, and commonly within web browsers */
        ttl?: number;
        /**
         * Pagination `page` number
         * @min 0
         */
        page?: number;
        /** Number of results to return in a `page` */
        per_page?: number;
        /**
         * Sort order
         * @default "desc"
         */
        order?: "desc" | "asc";
        /**
         * Attribute to sort on
         * @default "created_at"
         */
        order_by?:
          | "created_at"
          | "geo_score"
          | "id"
          | "observed_on"
          | "random"
          | "species_guess"
          | "updated_at"
          | "votes";
        /** Include observations with this ID */
        only_id?: "true" | "false";
      },
      params: RequestParams = {},
    ) =>
      this.request<Blob, any>({
        path: `/places/${id}/${zoom}/${x}/${y}.png`,
        method: "GET",
        query: query,
        secure: true,
        format: "blob",
        ...params,
      }),
  };
  ping = {
    /**
     * No description
     *
     * @tags Ping
     * @name PingList
     * @summary Check API availability
     * @request GET:/ping
     */
    pingList: (params: RequestParams = {}) =>
      this.request<
        {
          /** @example "available" */
          status: string;
        },
        Error
      >({
        path: `/ping`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  photos = {
    /**
     * No description
     *
     * @tags Photos
     * @name PhotosCreate
     * @summary Create photos
     * @request POST:/photos
     * @secure
     */
    photosCreate: (data: PhotosCreate, params: RequestParams = {}) =>
      this.request<ResultsPhotos, Error>({
        path: `/photos`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Photos
     * @name PhotosUpdate
     * @summary Update a photo
     * @request PUT:/photos/{id}
     * @secure
     */
    photosUpdate: (id: number, params: RequestParams = {}) =>
      this.request<ResultsPhotos, Error>({
        path: `/photos/${id}`,
        method: "PUT",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  observations = {
    /**
     * No description
     *
     * @tags Observations
     * @name UpdatesList
     * @summary Fetch observation updates
     * @request GET:/observations/updates
     * @secure
     */
    updatesList: (
      query?: {
        /** ISO8601 datetime after which the update was created */
        created_after?: string;
        /** When false this only returns updates that have not been viewed by the authenticated user. When true it returns all updates. */
        viewed?: "true" | "false";
        /** Restrict to updates on observations by the authenticated user (owner) or on observations the authenticated user is following */
        observations_by?: "owner" | "following";
        page?: number;
        per_page?: number;
        fields?: any;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultsUpdates, any>({
        path: `/observations/updates`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Observations
     * @name UmbrellaProjectStatsList
     * @summary Fetch umbrella project stats
     * @request GET:/observations/umbrella_project_stats
     * @secure
     */
    umbrellaProjectStatsList: (
      query?: {
        /** Filter by whether `positional_accuracy` is set or not */
        acc?: "true" | "false";
        /** Filter by captive / cultivated status */
        captive?: "true" | "false";
        /** Filter by whether the observation is in a place with a check list entry indicating the establishment means is `endemic` */
        endemic?: "true" | "false";
        /** Filter by observations that are georeferenced */
        geo?: "true" | "false";
        /** @deprecated */
        id_please?: "true" | "false";
        /** Filter by observations that have community identifications */
        identified?: "true" | "false";
        /** Filter by observations of taxa that are introduced in their location */
        introduced?: "true" | "false";
        /** Filter by observations that show on map tiles */
        mappable?: "true" | "false";
        /** Filter by observations of taxa that are native to their location */
        native?: "true" | "false";
        /** Filter by observations of taxa that outside their known ranges */
        out_of_range?: "true" | "false";
        /** @deprecated */
        pcid?: "true" | "false";
        /** Filter by observations with photos */
        photos?: "true" | "false";
        /** Filter by observations that have been favorited by at least one user */
        popular?: "true" | "false";
        /** Filter by observations with sounds */
        sounds?: "true" | "false";
        /** Filter by observations of active taxa */
        taxon_is_active?: "true" | "false";
        /** Filter by whether the observed taxon has a conservation status of "threatened" or worse */
        threatened?: "true" | "false";
        /** Filter by whether observations are 'verifiable' (i.e. have quality grades `research` or `needs_id`) */
        verifiable?: "true" | "false";
        /** Include observations with this ID */
        id?: (string | number)[];
        /** Exclude observations with this ID */
        not_id?: string[];
        /** Include observations with this license */
        license?: (
          | "cc-by"
          | "cc-by-nc"
          | "cc-by-nd"
          | "cc-by-sa"
          | "cc-by-nc-nd"
          | "cc-by-nc-sa"
          | "cc0"
        )[];
        /** Include observations with least one photo with this license */
        photo_license?: (
          | "cc-by"
          | "cc-by-nc"
          | "cc-by-nd"
          | "cc-by-sa"
          | "cc-by-nc-nd"
          | "cc-by-nc-sa"
          | "cc0"
        )[];
        /** Include observations where the license attribute is not null, i.e. it is licensed */
        licensed?: "true" | "false";
        /** Include observations with at least one photo with a license attribute that is not null */
        photo_licensed?: "true" | "false";
        /** Include observations observed within the place with this ID */
        place_id?: (string | number)[];
        /** Include observations added to the project with this ID or slug */
        project_id?: (number | string)[];
        /** Filter by observers who trust the project(s) specified in `project_id` OR trust the authenticated viewer */
        coords_viewable_for_proj?: "true" | "false";
        /** Include observations of taxa with this rank */
        rank?: (
          | "stateofmatter"
          | "kingdom"
          | "phylum"
          | "subphylum"
          | "superclass"
          | "class"
          | "subclass"
          | "infraclass"
          | "subterclass"
          | "superorder"
          | "order"
          | "suborder"
          | "infraorder"
          | "parvorder"
          | "zoosection"
          | "zoosubsection"
          | "superfamily"
          | "epifamily"
          | "family"
          | "subfamily"
          | "supertribe"
          | "tribe"
          | "subtribe"
          | "genus"
          | "genushybrid"
          | "subgenus"
          | "section"
          | "subsection"
          | "complex"
          | "species"
          | "hybrid"
          | "subspecies"
          | "variety"
          | "form"
          | "infrahybrid"
        )[];
        /** Include observations affiliated with the iNaturalist network website with this ID */
        site_id?: number[];
        /** Include observations that have at least one sound with this license */
        sound_license?: (
          | "cc-by"
          | "cc-by-nc"
          | "cc-by-nd"
          | "cc-by-sa"
          | "cc-by-nc-nd"
          | "cc-by-nc-sa"
          | "cc0"
        )[];
        /** Include observations of this taxon and its descendants */
        taxon_id?: number[];
        /** Exclude observations of this taxon and its descendants */
        without_taxon_id?: number[];
        /** Include observations of taxa that have a scientific or common name matching this string */
        taxon_name?: string;
        /** Include observations observed by users that have this ID or login */
        user_id?: string[];
        /** Include observations observed by users that have this login */
        user_login?: string[];
        /** Include observations observed within this hour of the day */
        hour?: number[];
        /** Include observations observed within this day of the month */
        day?: number[];
        /** Include observations observed within this month */
        month?: number[];
        /** Include observations observed within this year */
        year?: number[];
        /** Include observations created within this day of the month */
        created_day?: number[];
        /** Include observations created within this month */
        created_month?: number[];
        /** Include observations created within this year */
        created_year?: number[];
        /** Include observations with annotations using this controlled term ID */
        term_id?: number[];
        /** Include observations with annotations using this controlled value ID. Must be combined with the `term_id` parameter */
        term_value_id?: number[];
        /** Exclude observations with annotations using this controlled value ID. Must be combined with the `term_id` parameter */
        without_term_value_id?: number[];
        /** Include observations with annotations using this controlled term ID and associated term value IDs, or be missing annotations using this controlled term ID. Must be combined with the `term_value_id` or `without_term_value_id` parameters */
        term_id_or_unknown?: number[];
        /** Include observations with an annotation created by this user */
        annotation_user_id?: string[];
        /** Include observations with a positional accuracy above this value (meters) */
        acc_above?: number;
        /** Include observations with a positional accuracy below this value (meters) */
        acc_below?: number;
        /** Include observations with a positional accuracy below this value (in meters) or with an unknown positional accuracy */
        acc_below_or_unknown?: number;
        /** Include observations observed on or after this date/time */
        d1?: string;
        /** Include observations observed on or before this date/time */
        d2?: string;
        /** Include observations created on or after this date/time */
        created_d1?: string;
        /** Include observations created on or before this date/time */
        created_d2?: string;
        /** Include observations created on this date */
        created_on?: string;
        /** Include observations observed on this date */
        observed_on?: string;
        /** Exclude observations of taxa previously observed by this user */
        unobserved_by_user_id?: string;
        /** Include observations that match the rules of the project with this ID or slug */
        apply_project_rules_for?: string;
        /** Include observations included in this observation accuracy experiment */
        observation_accuracy_experiment_id?: number[];
        /** Include observations of taxa that have this conservation status code. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
        cs?: string;
        /** Include observations of taxa that have a conservation status from this authority. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
        csa?: string;
        /** Include observations of taxa that have this IUCN conservation status. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
        csi?: ("LC" | "NT" | "VU" | "EN" | "CR" | "EW" | "EX")[];
        /** Include observations with this geoprivacy setting */
        geoprivacy?: ("obscured" | "obscured_private" | "open" | "private")[];
        /** Include observations where this is the most conservative geoprivacy applied by a conservation status associated with one of the taxa proposed in the current identifications */
        taxon_geoprivacy?: (
          | "obscured"
          | "obscured_private"
          | "open"
          | "private"
        )[];
        /** Include observations where `geoprivacy` or `taxon_geoprivacy` match these values */
        obscuration?: ("obscured" | "private" | "none")[];
        /** Include observations of taxa with this rank or lower */
        hrank?: (
          | "stateofmatter"
          | "kingdom"
          | "phylum"
          | "subphylum"
          | "superclass"
          | "class"
          | "subclass"
          | "infraclass"
          | "subterclass"
          | "superorder"
          | "order"
          | "suborder"
          | "infraorder"
          | "parvorder"
          | "zoosection"
          | "zoosubsection"
          | "superfamily"
          | "epifamily"
          | "family"
          | "subfamily"
          | "supertribe"
          | "tribe"
          | "subtribe"
          | "genus"
          | "genushybrid"
          | "subgenus"
          | "section"
          | "subsection"
          | "complex"
          | "species"
          | "hybrid"
          | "subspecies"
          | "variety"
          | "form"
          | "infrahybrid"
        )[];
        /** Include observations of taxa with this rank or higher */
        lrank?: (
          | "stateofmatter"
          | "kingdom"
          | "phylum"
          | "subphylum"
          | "superclass"
          | "class"
          | "subclass"
          | "infraclass"
          | "subterclass"
          | "superorder"
          | "order"
          | "suborder"
          | "infraorder"
          | "parvorder"
          | "zoosection"
          | "zoosubsection"
          | "superfamily"
          | "epifamily"
          | "family"
          | "subfamily"
          | "supertribe"
          | "tribe"
          | "subtribe"
          | "genus"
          | "genushybrid"
          | "subgenus"
          | "section"
          | "subsection"
          | "complex"
          | "species"
          | "hybrid"
          | "subspecies"
          | "variety"
          | "form"
          | "infrahybrid"
        )[];
        /** Include observations of taxa within this iconic taxon */
        iconic_taxa?: (
          | "Actinopterygii"
          | "Animalia"
          | "Amphibia"
          | "Arachnida"
          | "Aves"
          | "Chromista"
          | "Fungi"
          | "Insecta"
          | "Mammalia"
          | "Mollusca"
          | "Reptilia"
          | "Plantae"
          | "Protozoa"
          | "unknown"
        )[];
        /** Include observations with an ID above this value */
        id_above?: number;
        /** Include observations with an ID below this value */
        id_below?: number;
        /**
         * Include observations based on level of agreement among identifications:
         *
         * * **most_agree:** includes observations where there are more active identifications of taxa that agree with the Observation Taxon than active identifications that disagree with the Observation Taxon
         * * **some_agree:** includes observations where there are some active identifications of taxa that agree with the Observation Taxon
         * * **most_disagree:** includes observations where there are more active identifications of taxa that disagree with the Observation Taxon than active identifications that agree with the Observation Taxon
         */
        identifications?: "most_agree" | "most_disagree" | "some_agree";
        /** Include observations where there is disagreement among active identifications */
        disagreements?: "true" | "false";
        /**
         * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
         * @format float
         * @min -90
         * @max 90
         */
        lat?: number;
        /**
         * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
         * @format float
         * @min -180
         * @max 180
         */
        lng?: number;
        /**
         * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
         * @format float
         */
        radius?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -90
         * @max 90
         */
        nelat?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -180
         * @max 180
         */
        nelng?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -90
         * @max 90
         */
        swlat?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -180
         * @max 180
         */
        swlng?: number;
        /** Include observations of taxa in a list with this ID */
        list_id?: number;
        /** Exclude observations added to the project this ID or slug */
        not_in_project?: string[];
        /** Exclude observations that match the rules of the project with this ID or slug */
        not_matching_project_rules_for?: string;
        /** Include observations with a description, tags, or place_guess matching this query. Can be combined with `search_on` */
        q?: string;
        /** Include observations where any of these properties match the value of the `q` parameter */
        search_on?:
          | "names"
          | "tags"
          | "description"
          | "place"
          | "taxon_page_obs_photos";
        /** Include observations with this quality grade */
        quality_grade?: ("casual" | "needs_id" | "research")[];
        /** Exclude observations that are casual for any reason other than being marked captive */
        not_casual_excluding_captive?: "true" | "false";
        /** Exclude observations with this observation field */
        without_field?: string;
        /** Include observations with outlinks from this source */
        outlink_source?: string;
        /** Include observations updated since this time */
        updated_since?: string;
        /** Must be combined with the `reviewed` parameter */
        viewer_id?: number;
        /** Filter by observations reviewed by the user with ID matching the value of the `viewer_id` parameter */
        reviewed?: "true" | "false";
        /** Filter by observations expected to occur nearby their location according to the latest iNaturalist Geomodel */
        expected_nearby?: "true" | "false";
        /** Filter by observations voted as not accurately depicting an organism or scene */
        fails_dqa_accurate?: "true" | "false";
        /** Filter by observations voted as not having an accurate date */
        fails_dqa_date?: "true" | "false";
        /** Filter by observations voted as not evidence of an organism */
        fails_dqa_evidence?: "true" | "false";
        /** Filter by observations voted as not having an accurate location */
        fails_dqa_location?: "true" | "false";
        /** Filter by observations voted as the community ID cannot be improved */
        fails_dqa_needs_id?: "true" | "false";
        /** Filter by observations voted as not recent evidence of an organism */
        fails_dqa_recent?: "true" | "false";
        /** Filter by observations voted as not having evidence related to a single subject */
        fails_dqa_subject?: "true" | "false";
        /** Filter by observations voted as not wild */
        fails_dqa_wild?: "true" | "false";
        /** Include observations created by users created after a date. Accepts dates with or without times, e.g. 2025-01-01, as well as relative day, month, or year, e.g. 10d, 2w, 1y */
        user_after?: string;
        /** Include observations created by users created before a date. Accepts dates with or without times, e.g. 2025-01-01, as well as relative day, month, or year, e.g. 10d, 2w, 1y */
        user_before?: string;
        /** Returned taxon common names will be from this locale */
        locale?: string;
        /** Returned taxon common names will prioritize common names from this place */
        preferred_place_id?: number;
        /** Set the `Cache-Control` HTTP header with this value as `max-age`, in seconds. This means subsequent identical requests may be cached on  iNaturalist servers, and commonly within web browsers */
        ttl?: number;
        /**
         * Pagination `page` number
         * @min 0
         */
        page?: number;
        /** Number of results to return in a `page` */
        per_page?: number;
        /**
         * Sort order
         * @default "desc"
         */
        order?: "desc" | "asc";
        /**
         * Attribute to sort on
         * @default "created_at"
         */
        order_by?:
          | "created_at"
          | "geo_score"
          | "id"
          | "observed_on"
          | "random"
          | "species_guess"
          | "updated_at"
          | "votes";
        /** Include observations with this ID */
        only_id?: "true" | "false";
        /**
         * Attribute fields to return in the response
         * @example "species_guess,observed_on"
         */
        fields?: any;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultsObservationsUmbrellaProjectStats, any>({
        path: `/observations/umbrella_project_stats`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Observations
     * @name TaxaList
     * @summary Fetch taxonomy metadata for matching observations
     * @request GET:/observations/taxa
     * @secure
     */
    taxaList: (
      query: {
        /** Include observations observed by users that have this ID or login */
        user_id: string[];
        /** Filter by whether `positional_accuracy` is set or not */
        acc?: "true" | "false";
        /** Filter by captive / cultivated status */
        captive?: "true" | "false";
        /** Filter by whether the observation is in a place with a check list entry indicating the establishment means is `endemic` */
        endemic?: "true" | "false";
        /** Filter by observations that are georeferenced */
        geo?: "true" | "false";
        /** @deprecated */
        id_please?: "true" | "false";
        /** Filter by observations that have community identifications */
        identified?: "true" | "false";
        /** Filter by observations of taxa that are introduced in their location */
        introduced?: "true" | "false";
        /** Filter by observations that show on map tiles */
        mappable?: "true" | "false";
        /** Filter by observations of taxa that are native to their location */
        native?: "true" | "false";
        /** Filter by observations of taxa that outside their known ranges */
        out_of_range?: "true" | "false";
        /** @deprecated */
        pcid?: "true" | "false";
        /** Filter by observations with photos */
        photos?: "true" | "false";
        /** Filter by observations that have been favorited by at least one user */
        popular?: "true" | "false";
        /** Filter by observations with sounds */
        sounds?: "true" | "false";
        /** Filter by observations of active taxa */
        taxon_is_active?: "true" | "false";
        /** Filter by whether the observed taxon has a conservation status of "threatened" or worse */
        threatened?: "true" | "false";
        /** Filter by whether observations are 'verifiable' (i.e. have quality grades `research` or `needs_id`) */
        verifiable?: "true" | "false";
        /** Include observations with this ID */
        id?: (string | number)[];
        /** Exclude observations with this ID */
        not_id?: string[];
        /** Include observations with this license */
        license?: (
          | "cc-by"
          | "cc-by-nc"
          | "cc-by-nd"
          | "cc-by-sa"
          | "cc-by-nc-nd"
          | "cc-by-nc-sa"
          | "cc0"
        )[];
        /** Include observations with least one photo with this license */
        photo_license?: (
          | "cc-by"
          | "cc-by-nc"
          | "cc-by-nd"
          | "cc-by-sa"
          | "cc-by-nc-nd"
          | "cc-by-nc-sa"
          | "cc0"
        )[];
        /** Include observations where the license attribute is not null, i.e. it is licensed */
        licensed?: "true" | "false";
        /** Include observations with at least one photo with a license attribute that is not null */
        photo_licensed?: "true" | "false";
        /** Include observations observed within the place with this ID */
        place_id?: (string | number)[];
        /** Include observations added to the project with this ID or slug */
        project_id?: (number | string)[];
        /** Filter by observers who trust the project(s) specified in `project_id` OR trust the authenticated viewer */
        coords_viewable_for_proj?: "true" | "false";
        /** Include observations of taxa with this rank */
        rank?: (
          | "stateofmatter"
          | "kingdom"
          | "phylum"
          | "subphylum"
          | "superclass"
          | "class"
          | "subclass"
          | "infraclass"
          | "subterclass"
          | "superorder"
          | "order"
          | "suborder"
          | "infraorder"
          | "parvorder"
          | "zoosection"
          | "zoosubsection"
          | "superfamily"
          | "epifamily"
          | "family"
          | "subfamily"
          | "supertribe"
          | "tribe"
          | "subtribe"
          | "genus"
          | "genushybrid"
          | "subgenus"
          | "section"
          | "subsection"
          | "complex"
          | "species"
          | "hybrid"
          | "subspecies"
          | "variety"
          | "form"
          | "infrahybrid"
        )[];
        /** Include observations affiliated with the iNaturalist network website with this ID */
        site_id?: number[];
        /** Include observations that have at least one sound with this license */
        sound_license?: (
          | "cc-by"
          | "cc-by-nc"
          | "cc-by-nd"
          | "cc-by-sa"
          | "cc-by-nc-nd"
          | "cc-by-nc-sa"
          | "cc0"
        )[];
        /** Include observations of this taxon and its descendants */
        taxon_id?: number[];
        /** Exclude observations of this taxon and its descendants */
        without_taxon_id?: number[];
        /** Include observations of taxa that have a scientific or common name matching this string */
        taxon_name?: string;
        /** Include observations observed by users that have this login */
        user_login?: string[];
        /** Include observations observed within this hour of the day */
        hour?: number[];
        /** Include observations observed within this day of the month */
        day?: number[];
        /** Include observations observed within this month */
        month?: number[];
        /** Include observations observed within this year */
        year?: number[];
        /** Include observations created within this day of the month */
        created_day?: number[];
        /** Include observations created within this month */
        created_month?: number[];
        /** Include observations created within this year */
        created_year?: number[];
        /** Include observations with annotations using this controlled term ID */
        term_id?: number[];
        /** Include observations with annotations using this controlled value ID. Must be combined with the `term_id` parameter */
        term_value_id?: number[];
        /** Exclude observations with annotations using this controlled value ID. Must be combined with the `term_id` parameter */
        without_term_value_id?: number[];
        /** Include observations with annotations using this controlled term ID and associated term value IDs, or be missing annotations using this controlled term ID. Must be combined with the `term_value_id` or `without_term_value_id` parameters */
        term_id_or_unknown?: number[];
        /** Include observations with an annotation created by this user */
        annotation_user_id?: string[];
        /** Include observations with a positional accuracy above this value (meters) */
        acc_above?: number;
        /** Include observations with a positional accuracy below this value (meters) */
        acc_below?: number;
        /** Include observations with a positional accuracy below this value (in meters) or with an unknown positional accuracy */
        acc_below_or_unknown?: number;
        /** Include observations observed on or after this date/time */
        d1?: string;
        /** Include observations observed on or before this date/time */
        d2?: string;
        /** Include observations created on or after this date/time */
        created_d1?: string;
        /** Include observations created on or before this date/time */
        created_d2?: string;
        /** Include observations created on this date */
        created_on?: string;
        /** Include observations observed on this date */
        observed_on?: string;
        /** Exclude observations of taxa previously observed by this user */
        unobserved_by_user_id?: string;
        /** Include observations that match the rules of the project with this ID or slug */
        apply_project_rules_for?: string;
        /** Include observations included in this observation accuracy experiment */
        observation_accuracy_experiment_id?: number[];
        /** Include observations of taxa that have this conservation status code. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
        cs?: string;
        /** Include observations of taxa that have a conservation status from this authority. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
        csa?: string;
        /** Include observations of taxa that have this IUCN conservation status. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
        csi?: ("LC" | "NT" | "VU" | "EN" | "CR" | "EW" | "EX")[];
        /** Include observations with this geoprivacy setting */
        geoprivacy?: ("obscured" | "obscured_private" | "open" | "private")[];
        /** Include observations where this is the most conservative geoprivacy applied by a conservation status associated with one of the taxa proposed in the current identifications */
        taxon_geoprivacy?: (
          | "obscured"
          | "obscured_private"
          | "open"
          | "private"
        )[];
        /** Include observations where `geoprivacy` or `taxon_geoprivacy` match these values */
        obscuration?: ("obscured" | "private" | "none")[];
        /** Include observations of taxa with this rank or lower */
        hrank?: (
          | "stateofmatter"
          | "kingdom"
          | "phylum"
          | "subphylum"
          | "superclass"
          | "class"
          | "subclass"
          | "infraclass"
          | "subterclass"
          | "superorder"
          | "order"
          | "suborder"
          | "infraorder"
          | "parvorder"
          | "zoosection"
          | "zoosubsection"
          | "superfamily"
          | "epifamily"
          | "family"
          | "subfamily"
          | "supertribe"
          | "tribe"
          | "subtribe"
          | "genus"
          | "genushybrid"
          | "subgenus"
          | "section"
          | "subsection"
          | "complex"
          | "species"
          | "hybrid"
          | "subspecies"
          | "variety"
          | "form"
          | "infrahybrid"
        )[];
        /** Include observations of taxa with this rank or higher */
        lrank?: (
          | "stateofmatter"
          | "kingdom"
          | "phylum"
          | "subphylum"
          | "superclass"
          | "class"
          | "subclass"
          | "infraclass"
          | "subterclass"
          | "superorder"
          | "order"
          | "suborder"
          | "infraorder"
          | "parvorder"
          | "zoosection"
          | "zoosubsection"
          | "superfamily"
          | "epifamily"
          | "family"
          | "subfamily"
          | "supertribe"
          | "tribe"
          | "subtribe"
          | "genus"
          | "genushybrid"
          | "subgenus"
          | "section"
          | "subsection"
          | "complex"
          | "species"
          | "hybrid"
          | "subspecies"
          | "variety"
          | "form"
          | "infrahybrid"
        )[];
        /** Include observations of taxa within this iconic taxon */
        iconic_taxa?: (
          | "Actinopterygii"
          | "Animalia"
          | "Amphibia"
          | "Arachnida"
          | "Aves"
          | "Chromista"
          | "Fungi"
          | "Insecta"
          | "Mammalia"
          | "Mollusca"
          | "Reptilia"
          | "Plantae"
          | "Protozoa"
          | "unknown"
        )[];
        /** Include observations with an ID above this value */
        id_above?: number;
        /** Include observations with an ID below this value */
        id_below?: number;
        /**
         * Include observations based on level of agreement among identifications:
         *
         * * **most_agree:** includes observations where there are more active identifications of taxa that agree with the Observation Taxon than active identifications that disagree with the Observation Taxon
         * * **some_agree:** includes observations where there are some active identifications of taxa that agree with the Observation Taxon
         * * **most_disagree:** includes observations where there are more active identifications of taxa that disagree with the Observation Taxon than active identifications that agree with the Observation Taxon
         */
        identifications?: "most_agree" | "most_disagree" | "some_agree";
        /** Include observations where there is disagreement among active identifications */
        disagreements?: "true" | "false";
        /**
         * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
         * @format float
         * @min -90
         * @max 90
         */
        lat?: number;
        /**
         * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
         * @format float
         * @min -180
         * @max 180
         */
        lng?: number;
        /**
         * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
         * @format float
         */
        radius?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -90
         * @max 90
         */
        nelat?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -180
         * @max 180
         */
        nelng?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -90
         * @max 90
         */
        swlat?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -180
         * @max 180
         */
        swlng?: number;
        /** Include observations of taxa in a list with this ID */
        list_id?: number;
        /** Exclude observations added to the project this ID or slug */
        not_in_project?: string[];
        /** Exclude observations that match the rules of the project with this ID or slug */
        not_matching_project_rules_for?: string;
        /** Include observations with a description, tags, or place_guess matching this query. Can be combined with `search_on` */
        q?: string;
        /** Include observations where any of these properties match the value of the `q` parameter */
        search_on?:
          | "names"
          | "tags"
          | "description"
          | "place"
          | "taxon_page_obs_photos";
        /** Include observations with this quality grade */
        quality_grade?: ("casual" | "needs_id" | "research")[];
        /** Exclude observations that are casual for any reason other than being marked captive */
        not_casual_excluding_captive?: "true" | "false";
        /** Exclude observations with this observation field */
        without_field?: string;
        /** Include observations with outlinks from this source */
        outlink_source?: string;
        /** Include observations updated since this time */
        updated_since?: string;
        /** Must be combined with the `reviewed` parameter */
        viewer_id?: number;
        /** Filter by observations reviewed by the user with ID matching the value of the `viewer_id` parameter */
        reviewed?: "true" | "false";
        /** Filter by observations expected to occur nearby their location according to the latest iNaturalist Geomodel */
        expected_nearby?: "true" | "false";
        /** Filter by observations voted as not accurately depicting an organism or scene */
        fails_dqa_accurate?: "true" | "false";
        /** Filter by observations voted as not having an accurate date */
        fails_dqa_date?: "true" | "false";
        /** Filter by observations voted as not evidence of an organism */
        fails_dqa_evidence?: "true" | "false";
        /** Filter by observations voted as not having an accurate location */
        fails_dqa_location?: "true" | "false";
        /** Filter by observations voted as the community ID cannot be improved */
        fails_dqa_needs_id?: "true" | "false";
        /** Filter by observations voted as not recent evidence of an organism */
        fails_dqa_recent?: "true" | "false";
        /** Filter by observations voted as not having evidence related to a single subject */
        fails_dqa_subject?: "true" | "false";
        /** Filter by observations voted as not wild */
        fails_dqa_wild?: "true" | "false";
        /** Include observations created by users created after a date. Accepts dates with or without times, e.g. 2025-01-01, as well as relative day, month, or year, e.g. 10d, 2w, 1y */
        user_after?: string;
        /** Include observations created by users created before a date. Accepts dates with or without times, e.g. 2025-01-01, as well as relative day, month, or year, e.g. 10d, 2w, 1y */
        user_before?: string;
        /** Returned taxon common names will be from this locale */
        locale?: string;
        /** Returned taxon common names will prioritize common names from this place */
        preferred_place_id?: number;
        /** Set the `Cache-Control` HTTP header with this value as `max-age`, in seconds. This means subsequent identical requests may be cached on  iNaturalist servers, and commonly within web browsers */
        ttl?: number;
        /**
         * Pagination `page` number
         * @min 0
         */
        page?: number;
        /** Number of results to return in a `page` */
        per_page?: number;
        /**
         * Sort order
         * @default "desc"
         */
        order?: "desc" | "asc";
        /**
         * Attribute to sort on
         * @default "created_at"
         */
        order_by?:
          | "created_at"
          | "geo_score"
          | "id"
          | "observed_on"
          | "random"
          | "species_guess"
          | "updated_at"
          | "votes";
        /** Include observations with this ID */
        only_id?: "true" | "false";
        /**
         * Attribute fields to return in the response
         * @example "species_guess,observed_on"
         */
        fields?: any;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultsObservationsTaxa, any>({
        path: `/observations/taxa`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Observations
     * @name SpeciesCountsList
     * @summary Fetch observation species counts
     * @request GET:/observations/species_counts
     * @secure
     */
    speciesCountsList: (
      query?: {
        /** Filter by whether `positional_accuracy` is set or not */
        acc?: "true" | "false";
        /** Filter by captive / cultivated status */
        captive?: "true" | "false";
        /** Filter by whether the observation is in a place with a check list entry indicating the establishment means is `endemic` */
        endemic?: "true" | "false";
        /** Filter by observations that are georeferenced */
        geo?: "true" | "false";
        /** @deprecated */
        id_please?: "true" | "false";
        /** Filter by observations that have community identifications */
        identified?: "true" | "false";
        /** Filter by observations of taxa that are introduced in their location */
        introduced?: "true" | "false";
        /** Filter by observations that show on map tiles */
        mappable?: "true" | "false";
        /** Filter by observations of taxa that are native to their location */
        native?: "true" | "false";
        /** Filter by observations of taxa that outside their known ranges */
        out_of_range?: "true" | "false";
        /** @deprecated */
        pcid?: "true" | "false";
        /** Filter by observations with photos */
        photos?: "true" | "false";
        /** Filter by observations that have been favorited by at least one user */
        popular?: "true" | "false";
        /** Filter by observations with sounds */
        sounds?: "true" | "false";
        /** Filter by observations of active taxa */
        taxon_is_active?: "true" | "false";
        /** Filter by whether the observed taxon has a conservation status of "threatened" or worse */
        threatened?: "true" | "false";
        /** Filter by whether observations are 'verifiable' (i.e. have quality grades `research` or `needs_id`) */
        verifiable?: "true" | "false";
        /** Include observations with this ID */
        id?: (string | number)[];
        /** Exclude observations with this ID */
        not_id?: string[];
        /** Include observations with this license */
        license?: (
          | "cc-by"
          | "cc-by-nc"
          | "cc-by-nd"
          | "cc-by-sa"
          | "cc-by-nc-nd"
          | "cc-by-nc-sa"
          | "cc0"
        )[];
        /** Include observations with least one photo with this license */
        photo_license?: (
          | "cc-by"
          | "cc-by-nc"
          | "cc-by-nd"
          | "cc-by-sa"
          | "cc-by-nc-nd"
          | "cc-by-nc-sa"
          | "cc0"
        )[];
        /** Include observations where the license attribute is not null, i.e. it is licensed */
        licensed?: "true" | "false";
        /** Include observations with at least one photo with a license attribute that is not null */
        photo_licensed?: "true" | "false";
        /** Include observations observed within the place with this ID */
        place_id?: (string | number)[];
        /** Include observations added to the project with this ID or slug */
        project_id?: (number | string)[];
        /** Filter by observers who trust the project(s) specified in `project_id` OR trust the authenticated viewer */
        coords_viewable_for_proj?: "true" | "false";
        /** Include observations of taxa with this rank */
        rank?: (
          | "stateofmatter"
          | "kingdom"
          | "phylum"
          | "subphylum"
          | "superclass"
          | "class"
          | "subclass"
          | "infraclass"
          | "subterclass"
          | "superorder"
          | "order"
          | "suborder"
          | "infraorder"
          | "parvorder"
          | "zoosection"
          | "zoosubsection"
          | "superfamily"
          | "epifamily"
          | "family"
          | "subfamily"
          | "supertribe"
          | "tribe"
          | "subtribe"
          | "genus"
          | "genushybrid"
          | "subgenus"
          | "section"
          | "subsection"
          | "complex"
          | "species"
          | "hybrid"
          | "subspecies"
          | "variety"
          | "form"
          | "infrahybrid"
        )[];
        /** Include observations affiliated with the iNaturalist network website with this ID */
        site_id?: number[];
        /** Include observations that have at least one sound with this license */
        sound_license?: (
          | "cc-by"
          | "cc-by-nc"
          | "cc-by-nd"
          | "cc-by-sa"
          | "cc-by-nc-nd"
          | "cc-by-nc-sa"
          | "cc0"
        )[];
        /** Include observations of this taxon and its descendants */
        taxon_id?: number[];
        /** Exclude observations of this taxon and its descendants */
        without_taxon_id?: number[];
        /** Include observations of taxa that have a scientific or common name matching this string */
        taxon_name?: string;
        /** Include observations observed by users that have this ID or login */
        user_id?: string[];
        /** Include observations observed by users that have this login */
        user_login?: string[];
        /** Include observations observed within this hour of the day */
        hour?: number[];
        /** Include observations observed within this day of the month */
        day?: number[];
        /** Include observations observed within this month */
        month?: number[];
        /** Include observations observed within this year */
        year?: number[];
        /** Include observations created within this day of the month */
        created_day?: number[];
        /** Include observations created within this month */
        created_month?: number[];
        /** Include observations created within this year */
        created_year?: number[];
        /** Include observations with annotations using this controlled term ID */
        term_id?: number[];
        /** Include observations with annotations using this controlled value ID. Must be combined with the `term_id` parameter */
        term_value_id?: number[];
        /** Exclude observations with annotations using this controlled value ID. Must be combined with the `term_id` parameter */
        without_term_value_id?: number[];
        /** Include observations with annotations using this controlled term ID and associated term value IDs, or be missing annotations using this controlled term ID. Must be combined with the `term_value_id` or `without_term_value_id` parameters */
        term_id_or_unknown?: number[];
        /** Include observations with an annotation created by this user */
        annotation_user_id?: string[];
        /** Include observations with a positional accuracy above this value (meters) */
        acc_above?: number;
        /** Include observations with a positional accuracy below this value (meters) */
        acc_below?: number;
        /** Include observations with a positional accuracy below this value (in meters) or with an unknown positional accuracy */
        acc_below_or_unknown?: number;
        /** Include observations observed on or after this date/time */
        d1?: string;
        /** Include observations observed on or before this date/time */
        d2?: string;
        /** Include observations created on or after this date/time */
        created_d1?: string;
        /** Include observations created on or before this date/time */
        created_d2?: string;
        /** Include observations created on this date */
        created_on?: string;
        /** Include observations observed on this date */
        observed_on?: string;
        /** Exclude observations of taxa previously observed by this user */
        unobserved_by_user_id?: string;
        /** Include observations that match the rules of the project with this ID or slug */
        apply_project_rules_for?: string;
        /** Include observations included in this observation accuracy experiment */
        observation_accuracy_experiment_id?: number[];
        /** Include observations of taxa that have this conservation status code. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
        cs?: string;
        /** Include observations of taxa that have a conservation status from this authority. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
        csa?: string;
        /** Include observations of taxa that have this IUCN conservation status. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
        csi?: ("LC" | "NT" | "VU" | "EN" | "CR" | "EW" | "EX")[];
        /** Include observations with this geoprivacy setting */
        geoprivacy?: ("obscured" | "obscured_private" | "open" | "private")[];
        /** Include observations where this is the most conservative geoprivacy applied by a conservation status associated with one of the taxa proposed in the current identifications */
        taxon_geoprivacy?: (
          | "obscured"
          | "obscured_private"
          | "open"
          | "private"
        )[];
        /** Include observations where `geoprivacy` or `taxon_geoprivacy` match these values */
        obscuration?: ("obscured" | "private" | "none")[];
        /** Include observations of taxa with this rank or lower */
        hrank?: (
          | "stateofmatter"
          | "kingdom"
          | "phylum"
          | "subphylum"
          | "superclass"
          | "class"
          | "subclass"
          | "infraclass"
          | "subterclass"
          | "superorder"
          | "order"
          | "suborder"
          | "infraorder"
          | "parvorder"
          | "zoosection"
          | "zoosubsection"
          | "superfamily"
          | "epifamily"
          | "family"
          | "subfamily"
          | "supertribe"
          | "tribe"
          | "subtribe"
          | "genus"
          | "genushybrid"
          | "subgenus"
          | "section"
          | "subsection"
          | "complex"
          | "species"
          | "hybrid"
          | "subspecies"
          | "variety"
          | "form"
          | "infrahybrid"
        )[];
        /** Include observations of taxa with this rank or higher */
        lrank?: (
          | "stateofmatter"
          | "kingdom"
          | "phylum"
          | "subphylum"
          | "superclass"
          | "class"
          | "subclass"
          | "infraclass"
          | "subterclass"
          | "superorder"
          | "order"
          | "suborder"
          | "infraorder"
          | "parvorder"
          | "zoosection"
          | "zoosubsection"
          | "superfamily"
          | "epifamily"
          | "family"
          | "subfamily"
          | "supertribe"
          | "tribe"
          | "subtribe"
          | "genus"
          | "genushybrid"
          | "subgenus"
          | "section"
          | "subsection"
          | "complex"
          | "species"
          | "hybrid"
          | "subspecies"
          | "variety"
          | "form"
          | "infrahybrid"
        )[];
        /** Include observations of taxa within this iconic taxon */
        iconic_taxa?: (
          | "Actinopterygii"
          | "Animalia"
          | "Amphibia"
          | "Arachnida"
          | "Aves"
          | "Chromista"
          | "Fungi"
          | "Insecta"
          | "Mammalia"
          | "Mollusca"
          | "Reptilia"
          | "Plantae"
          | "Protozoa"
          | "unknown"
        )[];
        /** Include observations with an ID above this value */
        id_above?: number;
        /** Include observations with an ID below this value */
        id_below?: number;
        /**
         * Include observations based on level of agreement among identifications:
         *
         * * **most_agree:** includes observations where there are more active identifications of taxa that agree with the Observation Taxon than active identifications that disagree with the Observation Taxon
         * * **some_agree:** includes observations where there are some active identifications of taxa that agree with the Observation Taxon
         * * **most_disagree:** includes observations where there are more active identifications of taxa that disagree with the Observation Taxon than active identifications that agree with the Observation Taxon
         */
        identifications?: "most_agree" | "most_disagree" | "some_agree";
        /** Include observations where there is disagreement among active identifications */
        disagreements?: "true" | "false";
        /**
         * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
         * @format float
         * @min -90
         * @max 90
         */
        lat?: number;
        /**
         * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
         * @format float
         * @min -180
         * @max 180
         */
        lng?: number;
        /**
         * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
         * @format float
         */
        radius?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -90
         * @max 90
         */
        nelat?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -180
         * @max 180
         */
        nelng?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -90
         * @max 90
         */
        swlat?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -180
         * @max 180
         */
        swlng?: number;
        /** Include observations of taxa in a list with this ID */
        list_id?: number;
        /** Exclude observations added to the project this ID or slug */
        not_in_project?: string[];
        /** Exclude observations that match the rules of the project with this ID or slug */
        not_matching_project_rules_for?: string;
        /** Include observations with a description, tags, or place_guess matching this query. Can be combined with `search_on` */
        q?: string;
        /** Include observations where any of these properties match the value of the `q` parameter */
        search_on?:
          | "names"
          | "tags"
          | "description"
          | "place"
          | "taxon_page_obs_photos";
        /** Include observations with this quality grade */
        quality_grade?: ("casual" | "needs_id" | "research")[];
        /** Exclude observations that are casual for any reason other than being marked captive */
        not_casual_excluding_captive?: "true" | "false";
        /** Exclude observations with this observation field */
        without_field?: string;
        /** Include observations with outlinks from this source */
        outlink_source?: string;
        /** Include observations updated since this time */
        updated_since?: string;
        /** Must be combined with the `reviewed` parameter */
        viewer_id?: number;
        /** Filter by observations reviewed by the user with ID matching the value of the `viewer_id` parameter */
        reviewed?: "true" | "false";
        /** Filter by observations expected to occur nearby their location according to the latest iNaturalist Geomodel */
        expected_nearby?: "true" | "false";
        /** Filter by observations voted as not accurately depicting an organism or scene */
        fails_dqa_accurate?: "true" | "false";
        /** Filter by observations voted as not having an accurate date */
        fails_dqa_date?: "true" | "false";
        /** Filter by observations voted as not evidence of an organism */
        fails_dqa_evidence?: "true" | "false";
        /** Filter by observations voted as not having an accurate location */
        fails_dqa_location?: "true" | "false";
        /** Filter by observations voted as the community ID cannot be improved */
        fails_dqa_needs_id?: "true" | "false";
        /** Filter by observations voted as not recent evidence of an organism */
        fails_dqa_recent?: "true" | "false";
        /** Filter by observations voted as not having evidence related to a single subject */
        fails_dqa_subject?: "true" | "false";
        /** Filter by observations voted as not wild */
        fails_dqa_wild?: "true" | "false";
        /** Include observations created by users created after a date. Accepts dates with or without times, e.g. 2025-01-01, as well as relative day, month, or year, e.g. 10d, 2w, 1y */
        user_after?: string;
        /** Include observations created by users created before a date. Accepts dates with or without times, e.g. 2025-01-01, as well as relative day, month, or year, e.g. 10d, 2w, 1y */
        user_before?: string;
        /** Returned taxon common names will be from this locale */
        locale?: string;
        /** Returned taxon common names will prioritize common names from this place */
        preferred_place_id?: number;
        /** Set the `Cache-Control` HTTP header with this value as `max-age`, in seconds. This means subsequent identical requests may be cached on  iNaturalist servers, and commonly within web browsers */
        ttl?: number;
        /**
         * Pagination `page` number
         * @min 0
         */
        page?: number;
        /** Number of results to return in a `page` */
        per_page?: number;
        /**
         * Sort order
         * @default "desc"
         */
        order?: "desc" | "asc";
        /**
         * Attribute fields to return in the response
         * @example "species_guess,observed_on"
         */
        fields?: any;
        include_ancestors?: "true" | "false";
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultsObservationsSpeciesCounts, any>({
        path: `/observations/species_counts`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Observations
     * @name QualityGradesList
     * @summary Fetch observation quality grade counts
     * @request GET:/observations/quality_grades
     * @secure
     */
    qualityGradesList: (
      query?: {
        fields?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultsObservationsQualityGrades, Error>({
        path: `/observations/quality_grades`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Observations
     * @name PopularFieldValuesList
     * @summary Fetch observation controlled terms values and a monthly histogram
     * @request GET:/observations/popular_field_values
     * @secure
     */
    popularFieldValuesList: (
      query?: {
        /** Filter by whether `positional_accuracy` is set or not */
        acc?: "true" | "false";
        /** Filter by captive / cultivated status */
        captive?: "true" | "false";
        /** Filter by whether the observation is in a place with a check list entry indicating the establishment means is `endemic` */
        endemic?: "true" | "false";
        /** Filter by observations that are georeferenced */
        geo?: "true" | "false";
        /** @deprecated */
        id_please?: "true" | "false";
        /** Filter by observations that have community identifications */
        identified?: "true" | "false";
        /** Filter by observations of taxa that are introduced in their location */
        introduced?: "true" | "false";
        /** Filter by observations that show on map tiles */
        mappable?: "true" | "false";
        /** Filter by observations of taxa that are native to their location */
        native?: "true" | "false";
        /** Filter by observations of taxa that outside their known ranges */
        out_of_range?: "true" | "false";
        /** @deprecated */
        pcid?: "true" | "false";
        /** Filter by observations with photos */
        photos?: "true" | "false";
        /** Filter by observations that have been favorited by at least one user */
        popular?: "true" | "false";
        /** Filter by observations with sounds */
        sounds?: "true" | "false";
        /** Filter by observations of active taxa */
        taxon_is_active?: "true" | "false";
        /** Filter by whether the observed taxon has a conservation status of "threatened" or worse */
        threatened?: "true" | "false";
        /** Filter by whether observations are 'verifiable' (i.e. have quality grades `research` or `needs_id`) */
        verifiable?: "true" | "false";
        /** Include observations with this ID */
        id?: (string | number)[];
        /** Exclude observations with this ID */
        not_id?: string[];
        /** Include observations with this license */
        license?: (
          | "cc-by"
          | "cc-by-nc"
          | "cc-by-nd"
          | "cc-by-sa"
          | "cc-by-nc-nd"
          | "cc-by-nc-sa"
          | "cc0"
        )[];
        /** Include observations with least one photo with this license */
        photo_license?: (
          | "cc-by"
          | "cc-by-nc"
          | "cc-by-nd"
          | "cc-by-sa"
          | "cc-by-nc-nd"
          | "cc-by-nc-sa"
          | "cc0"
        )[];
        /** Include observations where the license attribute is not null, i.e. it is licensed */
        licensed?: "true" | "false";
        /** Include observations with at least one photo with a license attribute that is not null */
        photo_licensed?: "true" | "false";
        /** Include observations observed within the place with this ID */
        place_id?: (string | number)[];
        /** Include observations added to the project with this ID or slug */
        project_id?: (number | string)[];
        /** Filter by observers who trust the project(s) specified in `project_id` OR trust the authenticated viewer */
        coords_viewable_for_proj?: "true" | "false";
        /** Include observations of taxa with this rank */
        rank?: (
          | "stateofmatter"
          | "kingdom"
          | "phylum"
          | "subphylum"
          | "superclass"
          | "class"
          | "subclass"
          | "infraclass"
          | "subterclass"
          | "superorder"
          | "order"
          | "suborder"
          | "infraorder"
          | "parvorder"
          | "zoosection"
          | "zoosubsection"
          | "superfamily"
          | "epifamily"
          | "family"
          | "subfamily"
          | "supertribe"
          | "tribe"
          | "subtribe"
          | "genus"
          | "genushybrid"
          | "subgenus"
          | "section"
          | "subsection"
          | "complex"
          | "species"
          | "hybrid"
          | "subspecies"
          | "variety"
          | "form"
          | "infrahybrid"
        )[];
        /** Include observations affiliated with the iNaturalist network website with this ID */
        site_id?: number[];
        /** Include observations that have at least one sound with this license */
        sound_license?: (
          | "cc-by"
          | "cc-by-nc"
          | "cc-by-nd"
          | "cc-by-sa"
          | "cc-by-nc-nd"
          | "cc-by-nc-sa"
          | "cc0"
        )[];
        /** Include observations of this taxon and its descendants */
        taxon_id?: number[];
        /** Exclude observations of this taxon and its descendants */
        without_taxon_id?: number[];
        /** Include observations of taxa that have a scientific or common name matching this string */
        taxon_name?: string;
        /** Include observations observed by users that have this ID or login */
        user_id?: string[];
        /** Include observations observed by users that have this login */
        user_login?: string[];
        /** Include observations observed within this hour of the day */
        hour?: number[];
        /** Include observations observed within this day of the month */
        day?: number[];
        /** Include observations observed within this month */
        month?: number[];
        /** Include observations observed within this year */
        year?: number[];
        /** Include observations created within this day of the month */
        created_day?: number[];
        /** Include observations created within this month */
        created_month?: number[];
        /** Include observations created within this year */
        created_year?: number[];
        /** Include observations with annotations using this controlled term ID */
        term_id?: number[];
        /** Include observations with annotations using this controlled value ID. Must be combined with the `term_id` parameter */
        term_value_id?: number[];
        /** Exclude observations with annotations using this controlled value ID. Must be combined with the `term_id` parameter */
        without_term_value_id?: number[];
        /** Include observations with annotations using this controlled term ID and associated term value IDs, or be missing annotations using this controlled term ID. Must be combined with the `term_value_id` or `without_term_value_id` parameters */
        term_id_or_unknown?: number[];
        /** Include observations with an annotation created by this user */
        annotation_user_id?: string[];
        /** Include observations with a positional accuracy above this value (meters) */
        acc_above?: number;
        /** Include observations with a positional accuracy below this value (meters) */
        acc_below?: number;
        /** Include observations with a positional accuracy below this value (in meters) or with an unknown positional accuracy */
        acc_below_or_unknown?: number;
        /** Include observations observed on or after this date/time */
        d1?: string;
        /** Include observations observed on or before this date/time */
        d2?: string;
        /** Include observations created on or after this date/time */
        created_d1?: string;
        /** Include observations created on or before this date/time */
        created_d2?: string;
        /** Include observations created on this date */
        created_on?: string;
        /** Include observations observed on this date */
        observed_on?: string;
        /** Exclude observations of taxa previously observed by this user */
        unobserved_by_user_id?: string;
        /** Include observations that match the rules of the project with this ID or slug */
        apply_project_rules_for?: string;
        /** Include observations included in this observation accuracy experiment */
        observation_accuracy_experiment_id?: number[];
        /** Include observations of taxa that have this conservation status code. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
        cs?: string;
        /** Include observations of taxa that have a conservation status from this authority. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
        csa?: string;
        /** Include observations of taxa that have this IUCN conservation status. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
        csi?: ("LC" | "NT" | "VU" | "EN" | "CR" | "EW" | "EX")[];
        /** Include observations with this geoprivacy setting */
        geoprivacy?: ("obscured" | "obscured_private" | "open" | "private")[];
        /** Include observations where this is the most conservative geoprivacy applied by a conservation status associated with one of the taxa proposed in the current identifications */
        taxon_geoprivacy?: (
          | "obscured"
          | "obscured_private"
          | "open"
          | "private"
        )[];
        /** Include observations where `geoprivacy` or `taxon_geoprivacy` match these values */
        obscuration?: ("obscured" | "private" | "none")[];
        /** Include observations of taxa with this rank or lower */
        hrank?: (
          | "stateofmatter"
          | "kingdom"
          | "phylum"
          | "subphylum"
          | "superclass"
          | "class"
          | "subclass"
          | "infraclass"
          | "subterclass"
          | "superorder"
          | "order"
          | "suborder"
          | "infraorder"
          | "parvorder"
          | "zoosection"
          | "zoosubsection"
          | "superfamily"
          | "epifamily"
          | "family"
          | "subfamily"
          | "supertribe"
          | "tribe"
          | "subtribe"
          | "genus"
          | "genushybrid"
          | "subgenus"
          | "section"
          | "subsection"
          | "complex"
          | "species"
          | "hybrid"
          | "subspecies"
          | "variety"
          | "form"
          | "infrahybrid"
        )[];
        /** Include observations of taxa with this rank or higher */
        lrank?: (
          | "stateofmatter"
          | "kingdom"
          | "phylum"
          | "subphylum"
          | "superclass"
          | "class"
          | "subclass"
          | "infraclass"
          | "subterclass"
          | "superorder"
          | "order"
          | "suborder"
          | "infraorder"
          | "parvorder"
          | "zoosection"
          | "zoosubsection"
          | "superfamily"
          | "epifamily"
          | "family"
          | "subfamily"
          | "supertribe"
          | "tribe"
          | "subtribe"
          | "genus"
          | "genushybrid"
          | "subgenus"
          | "section"
          | "subsection"
          | "complex"
          | "species"
          | "hybrid"
          | "subspecies"
          | "variety"
          | "form"
          | "infrahybrid"
        )[];
        /** Include observations of taxa within this iconic taxon */
        iconic_taxa?: (
          | "Actinopterygii"
          | "Animalia"
          | "Amphibia"
          | "Arachnida"
          | "Aves"
          | "Chromista"
          | "Fungi"
          | "Insecta"
          | "Mammalia"
          | "Mollusca"
          | "Reptilia"
          | "Plantae"
          | "Protozoa"
          | "unknown"
        )[];
        /** Include observations with an ID above this value */
        id_above?: number;
        /** Include observations with an ID below this value */
        id_below?: number;
        /**
         * Include observations based on level of agreement among identifications:
         *
         * * **most_agree:** includes observations where there are more active identifications of taxa that agree with the Observation Taxon than active identifications that disagree with the Observation Taxon
         * * **some_agree:** includes observations where there are some active identifications of taxa that agree with the Observation Taxon
         * * **most_disagree:** includes observations where there are more active identifications of taxa that disagree with the Observation Taxon than active identifications that agree with the Observation Taxon
         */
        identifications?: "most_agree" | "most_disagree" | "some_agree";
        /** Include observations where there is disagreement among active identifications */
        disagreements?: "true" | "false";
        /**
         * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
         * @format float
         * @min -90
         * @max 90
         */
        lat?: number;
        /**
         * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
         * @format float
         * @min -180
         * @max 180
         */
        lng?: number;
        /**
         * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
         * @format float
         */
        radius?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -90
         * @max 90
         */
        nelat?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -180
         * @max 180
         */
        nelng?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -90
         * @max 90
         */
        swlat?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -180
         * @max 180
         */
        swlng?: number;
        /** Include observations of taxa in a list with this ID */
        list_id?: number;
        /** Exclude observations added to the project this ID or slug */
        not_in_project?: string[];
        /** Exclude observations that match the rules of the project with this ID or slug */
        not_matching_project_rules_for?: string;
        /** Include observations with a description, tags, or place_guess matching this query. Can be combined with `search_on` */
        q?: string;
        /** Include observations where any of these properties match the value of the `q` parameter */
        search_on?:
          | "names"
          | "tags"
          | "description"
          | "place"
          | "taxon_page_obs_photos";
        /** Include observations with this quality grade */
        quality_grade?: ("casual" | "needs_id" | "research")[];
        /** Exclude observations that are casual for any reason other than being marked captive */
        not_casual_excluding_captive?: "true" | "false";
        /** Exclude observations with this observation field */
        without_field?: string;
        /** Include observations with outlinks from this source */
        outlink_source?: string;
        /** Include observations updated since this time */
        updated_since?: string;
        /** Must be combined with the `reviewed` parameter */
        viewer_id?: number;
        /** Filter by observations reviewed by the user with ID matching the value of the `viewer_id` parameter */
        reviewed?: "true" | "false";
        /** Filter by observations expected to occur nearby their location according to the latest iNaturalist Geomodel */
        expected_nearby?: "true" | "false";
        /** Filter by observations voted as not accurately depicting an organism or scene */
        fails_dqa_accurate?: "true" | "false";
        /** Filter by observations voted as not having an accurate date */
        fails_dqa_date?: "true" | "false";
        /** Filter by observations voted as not evidence of an organism */
        fails_dqa_evidence?: "true" | "false";
        /** Filter by observations voted as not having an accurate location */
        fails_dqa_location?: "true" | "false";
        /** Filter by observations voted as the community ID cannot be improved */
        fails_dqa_needs_id?: "true" | "false";
        /** Filter by observations voted as not recent evidence of an organism */
        fails_dqa_recent?: "true" | "false";
        /** Filter by observations voted as not having evidence related to a single subject */
        fails_dqa_subject?: "true" | "false";
        /** Filter by observations voted as not wild */
        fails_dqa_wild?: "true" | "false";
        /** Include observations created by users created after a date. Accepts dates with or without times, e.g. 2025-01-01, as well as relative day, month, or year, e.g. 10d, 2w, 1y */
        user_after?: string;
        /** Include observations created by users created before a date. Accepts dates with or without times, e.g. 2025-01-01, as well as relative day, month, or year, e.g. 10d, 2w, 1y */
        user_before?: string;
        /** Returned taxon common names will be from this locale */
        locale?: string;
        /** Returned taxon common names will prioritize common names from this place */
        preferred_place_id?: number;
        /** Set the `Cache-Control` HTTP header with this value as `max-age`, in seconds. This means subsequent identical requests may be cached on  iNaturalist servers, and commonly within web browsers */
        ttl?: number;
        /**
         * Pagination `page` number
         * @min 0
         */
        page?: number;
        /** Number of results to return in a `page` */
        per_page?: number;
        /**
         * Sort order
         * @default "desc"
         */
        order?: "desc" | "asc";
        /**
         * Attribute to sort on
         * @default "created_at"
         */
        order_by?:
          | "created_at"
          | "geo_score"
          | "id"
          | "observed_on"
          | "random"
          | "species_guess"
          | "updated_at"
          | "votes";
        /** Include observations with this ID */
        only_id?: "true" | "false";
        /**
         * Attribute fields to return in the response
         * @example "species_guess,observed_on"
         */
        fields?: any;
        no_histograms?: "true" | "false";
        unannotated?: "true" | "false";
        /** @default "observed" */
        date_field?: "observed" | "created";
        /** @default "month_of_year" */
        interval?: "month_of_year" | "week_of_year";
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultsObservationsPopularFieldValues, any>({
        path: `/observations/popular_field_values`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Observations
     * @name ObserversList
     * @summary Fetch observation observers
     * @request GET:/observations/observers
     * @secure
     */
    observersList: (
      query?: {
        /** Filter by whether `positional_accuracy` is set or not */
        acc?: "true" | "false";
        /** Filter by captive / cultivated status */
        captive?: "true" | "false";
        /** Filter by whether the observation is in a place with a check list entry indicating the establishment means is `endemic` */
        endemic?: "true" | "false";
        /** Filter by observations that are georeferenced */
        geo?: "true" | "false";
        /** @deprecated */
        id_please?: "true" | "false";
        /** Filter by observations that have community identifications */
        identified?: "true" | "false";
        /** Filter by observations of taxa that are introduced in their location */
        introduced?: "true" | "false";
        /** Filter by observations that show on map tiles */
        mappable?: "true" | "false";
        /** Filter by observations of taxa that are native to their location */
        native?: "true" | "false";
        /** Filter by observations of taxa that outside their known ranges */
        out_of_range?: "true" | "false";
        /** @deprecated */
        pcid?: "true" | "false";
        /** Filter by observations with photos */
        photos?: "true" | "false";
        /** Filter by observations that have been favorited by at least one user */
        popular?: "true" | "false";
        /** Filter by observations with sounds */
        sounds?: "true" | "false";
        /** Filter by observations of active taxa */
        taxon_is_active?: "true" | "false";
        /** Filter by whether the observed taxon has a conservation status of "threatened" or worse */
        threatened?: "true" | "false";
        /** Filter by whether observations are 'verifiable' (i.e. have quality grades `research` or `needs_id`) */
        verifiable?: "true" | "false";
        /** Include observations with this ID */
        id?: (string | number)[];
        /** Exclude observations with this ID */
        not_id?: string[];
        /** Include observations with this license */
        license?: (
          | "cc-by"
          | "cc-by-nc"
          | "cc-by-nd"
          | "cc-by-sa"
          | "cc-by-nc-nd"
          | "cc-by-nc-sa"
          | "cc0"
        )[];
        /** Include observations with least one photo with this license */
        photo_license?: (
          | "cc-by"
          | "cc-by-nc"
          | "cc-by-nd"
          | "cc-by-sa"
          | "cc-by-nc-nd"
          | "cc-by-nc-sa"
          | "cc0"
        )[];
        /** Include observations where the license attribute is not null, i.e. it is licensed */
        licensed?: "true" | "false";
        /** Include observations with at least one photo with a license attribute that is not null */
        photo_licensed?: "true" | "false";
        /** Include observations observed within the place with this ID */
        place_id?: (string | number)[];
        /** Include observations added to the project with this ID or slug */
        project_id?: (number | string)[];
        /** Filter by observers who trust the project(s) specified in `project_id` OR trust the authenticated viewer */
        coords_viewable_for_proj?: "true" | "false";
        /** Include observations of taxa with this rank */
        rank?: (
          | "stateofmatter"
          | "kingdom"
          | "phylum"
          | "subphylum"
          | "superclass"
          | "class"
          | "subclass"
          | "infraclass"
          | "subterclass"
          | "superorder"
          | "order"
          | "suborder"
          | "infraorder"
          | "parvorder"
          | "zoosection"
          | "zoosubsection"
          | "superfamily"
          | "epifamily"
          | "family"
          | "subfamily"
          | "supertribe"
          | "tribe"
          | "subtribe"
          | "genus"
          | "genushybrid"
          | "subgenus"
          | "section"
          | "subsection"
          | "complex"
          | "species"
          | "hybrid"
          | "subspecies"
          | "variety"
          | "form"
          | "infrahybrid"
        )[];
        /** Include observations affiliated with the iNaturalist network website with this ID */
        site_id?: number[];
        /** Include observations that have at least one sound with this license */
        sound_license?: (
          | "cc-by"
          | "cc-by-nc"
          | "cc-by-nd"
          | "cc-by-sa"
          | "cc-by-nc-nd"
          | "cc-by-nc-sa"
          | "cc0"
        )[];
        /** Include observations of this taxon and its descendants */
        taxon_id?: number[];
        /** Exclude observations of this taxon and its descendants */
        without_taxon_id?: number[];
        /** Include observations of taxa that have a scientific or common name matching this string */
        taxon_name?: string;
        /** Include observations observed by users that have this ID or login */
        user_id?: string[];
        /** Include observations observed by users that have this login */
        user_login?: string[];
        /** Include observations observed within this hour of the day */
        hour?: number[];
        /** Include observations observed within this day of the month */
        day?: number[];
        /** Include observations observed within this month */
        month?: number[];
        /** Include observations observed within this year */
        year?: number[];
        /** Include observations created within this day of the month */
        created_day?: number[];
        /** Include observations created within this month */
        created_month?: number[];
        /** Include observations created within this year */
        created_year?: number[];
        /** Include observations with annotations using this controlled term ID */
        term_id?: number[];
        /** Include observations with annotations using this controlled value ID. Must be combined with the `term_id` parameter */
        term_value_id?: number[];
        /** Exclude observations with annotations using this controlled value ID. Must be combined with the `term_id` parameter */
        without_term_value_id?: number[];
        /** Include observations with annotations using this controlled term ID and associated term value IDs, or be missing annotations using this controlled term ID. Must be combined with the `term_value_id` or `without_term_value_id` parameters */
        term_id_or_unknown?: number[];
        /** Include observations with an annotation created by this user */
        annotation_user_id?: string[];
        /** Include observations with a positional accuracy above this value (meters) */
        acc_above?: number;
        /** Include observations with a positional accuracy below this value (meters) */
        acc_below?: number;
        /** Include observations with a positional accuracy below this value (in meters) or with an unknown positional accuracy */
        acc_below_or_unknown?: number;
        /** Include observations observed on or after this date/time */
        d1?: string;
        /** Include observations observed on or before this date/time */
        d2?: string;
        /** Include observations created on or after this date/time */
        created_d1?: string;
        /** Include observations created on or before this date/time */
        created_d2?: string;
        /** Include observations created on this date */
        created_on?: string;
        /** Include observations observed on this date */
        observed_on?: string;
        /** Exclude observations of taxa previously observed by this user */
        unobserved_by_user_id?: string;
        /** Include observations that match the rules of the project with this ID or slug */
        apply_project_rules_for?: string;
        /** Include observations included in this observation accuracy experiment */
        observation_accuracy_experiment_id?: number[];
        /** Include observations of taxa that have this conservation status code. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
        cs?: string;
        /** Include observations of taxa that have a conservation status from this authority. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
        csa?: string;
        /** Include observations of taxa that have this IUCN conservation status. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
        csi?: ("LC" | "NT" | "VU" | "EN" | "CR" | "EW" | "EX")[];
        /** Include observations with this geoprivacy setting */
        geoprivacy?: ("obscured" | "obscured_private" | "open" | "private")[];
        /** Include observations where this is the most conservative geoprivacy applied by a conservation status associated with one of the taxa proposed in the current identifications */
        taxon_geoprivacy?: (
          | "obscured"
          | "obscured_private"
          | "open"
          | "private"
        )[];
        /** Include observations where `geoprivacy` or `taxon_geoprivacy` match these values */
        obscuration?: ("obscured" | "private" | "none")[];
        /** Include observations of taxa with this rank or lower */
        hrank?: (
          | "stateofmatter"
          | "kingdom"
          | "phylum"
          | "subphylum"
          | "superclass"
          | "class"
          | "subclass"
          | "infraclass"
          | "subterclass"
          | "superorder"
          | "order"
          | "suborder"
          | "infraorder"
          | "parvorder"
          | "zoosection"
          | "zoosubsection"
          | "superfamily"
          | "epifamily"
          | "family"
          | "subfamily"
          | "supertribe"
          | "tribe"
          | "subtribe"
          | "genus"
          | "genushybrid"
          | "subgenus"
          | "section"
          | "subsection"
          | "complex"
          | "species"
          | "hybrid"
          | "subspecies"
          | "variety"
          | "form"
          | "infrahybrid"
        )[];
        /** Include observations of taxa with this rank or higher */
        lrank?: (
          | "stateofmatter"
          | "kingdom"
          | "phylum"
          | "subphylum"
          | "superclass"
          | "class"
          | "subclass"
          | "infraclass"
          | "subterclass"
          | "superorder"
          | "order"
          | "suborder"
          | "infraorder"
          | "parvorder"
          | "zoosection"
          | "zoosubsection"
          | "superfamily"
          | "epifamily"
          | "family"
          | "subfamily"
          | "supertribe"
          | "tribe"
          | "subtribe"
          | "genus"
          | "genushybrid"
          | "subgenus"
          | "section"
          | "subsection"
          | "complex"
          | "species"
          | "hybrid"
          | "subspecies"
          | "variety"
          | "form"
          | "infrahybrid"
        )[];
        /** Include observations of taxa within this iconic taxon */
        iconic_taxa?: (
          | "Actinopterygii"
          | "Animalia"
          | "Amphibia"
          | "Arachnida"
          | "Aves"
          | "Chromista"
          | "Fungi"
          | "Insecta"
          | "Mammalia"
          | "Mollusca"
          | "Reptilia"
          | "Plantae"
          | "Protozoa"
          | "unknown"
        )[];
        /** Include observations with an ID above this value */
        id_above?: number;
        /** Include observations with an ID below this value */
        id_below?: number;
        /**
         * Include observations based on level of agreement among identifications:
         *
         * * **most_agree:** includes observations where there are more active identifications of taxa that agree with the Observation Taxon than active identifications that disagree with the Observation Taxon
         * * **some_agree:** includes observations where there are some active identifications of taxa that agree with the Observation Taxon
         * * **most_disagree:** includes observations where there are more active identifications of taxa that disagree with the Observation Taxon than active identifications that agree with the Observation Taxon
         */
        identifications?: "most_agree" | "most_disagree" | "some_agree";
        /** Include observations where there is disagreement among active identifications */
        disagreements?: "true" | "false";
        /**
         * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
         * @format float
         * @min -90
         * @max 90
         */
        lat?: number;
        /**
         * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
         * @format float
         * @min -180
         * @max 180
         */
        lng?: number;
        /**
         * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
         * @format float
         */
        radius?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -90
         * @max 90
         */
        nelat?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -180
         * @max 180
         */
        nelng?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -90
         * @max 90
         */
        swlat?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -180
         * @max 180
         */
        swlng?: number;
        /** Include observations of taxa in a list with this ID */
        list_id?: number;
        /** Exclude observations added to the project this ID or slug */
        not_in_project?: string[];
        /** Exclude observations that match the rules of the project with this ID or slug */
        not_matching_project_rules_for?: string;
        /** Include observations with a description, tags, or place_guess matching this query. Can be combined with `search_on` */
        q?: string;
        /** Include observations where any of these properties match the value of the `q` parameter */
        search_on?:
          | "names"
          | "tags"
          | "description"
          | "place"
          | "taxon_page_obs_photos";
        /** Include observations with this quality grade */
        quality_grade?: ("casual" | "needs_id" | "research")[];
        /** Exclude observations that are casual for any reason other than being marked captive */
        not_casual_excluding_captive?: "true" | "false";
        /** Exclude observations with this observation field */
        without_field?: string;
        /** Include observations with outlinks from this source */
        outlink_source?: string;
        /** Include observations updated since this time */
        updated_since?: string;
        /** Must be combined with the `reviewed` parameter */
        viewer_id?: number;
        /** Filter by observations reviewed by the user with ID matching the value of the `viewer_id` parameter */
        reviewed?: "true" | "false";
        /** Filter by observations expected to occur nearby their location according to the latest iNaturalist Geomodel */
        expected_nearby?: "true" | "false";
        /** Filter by observations voted as not accurately depicting an organism or scene */
        fails_dqa_accurate?: "true" | "false";
        /** Filter by observations voted as not having an accurate date */
        fails_dqa_date?: "true" | "false";
        /** Filter by observations voted as not evidence of an organism */
        fails_dqa_evidence?: "true" | "false";
        /** Filter by observations voted as not having an accurate location */
        fails_dqa_location?: "true" | "false";
        /** Filter by observations voted as the community ID cannot be improved */
        fails_dqa_needs_id?: "true" | "false";
        /** Filter by observations voted as not recent evidence of an organism */
        fails_dqa_recent?: "true" | "false";
        /** Filter by observations voted as not having evidence related to a single subject */
        fails_dqa_subject?: "true" | "false";
        /** Filter by observations voted as not wild */
        fails_dqa_wild?: "true" | "false";
        /** Include observations created by users created after a date. Accepts dates with or without times, e.g. 2025-01-01, as well as relative day, month, or year, e.g. 10d, 2w, 1y */
        user_after?: string;
        /** Include observations created by users created before a date. Accepts dates with or without times, e.g. 2025-01-01, as well as relative day, month, or year, e.g. 10d, 2w, 1y */
        user_before?: string;
        /** Returned taxon common names will be from this locale */
        locale?: string;
        /** Returned taxon common names will prioritize common names from this place */
        preferred_place_id?: number;
        /** Set the `Cache-Control` HTTP header with this value as `max-age`, in seconds. This means subsequent identical requests may be cached on  iNaturalist servers, and commonly within web browsers */
        ttl?: number;
        /**
         * Pagination `page` number
         * @min 0
         */
        page?: number;
        /** Number of results to return in a `page` */
        per_page?: number;
        /**
         * Sort order
         * @default "desc"
         */
        order?: "desc" | "asc";
        /** Include observations with this ID */
        only_id?: "true" | "false";
        /**
         * Attribute fields to return in the response
         * @example "species_guess,observed_on"
         */
        fields?: any;
        /** @default "observation_count" */
        order_by?: "observation_count" | "species_count";
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultsObservationsObservers, any>({
        path: `/observations/observers`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Observations
     * @name IdentifiersList
     * @summary Fetch observation identifiers
     * @request GET:/observations/identifiers
     * @secure
     */
    identifiersList: (
      query?: {
        /** Filter by whether `positional_accuracy` is set or not */
        acc?: "true" | "false";
        /** Filter by captive / cultivated status */
        captive?: "true" | "false";
        /** Filter by whether the observation is in a place with a check list entry indicating the establishment means is `endemic` */
        endemic?: "true" | "false";
        /** Filter by observations that are georeferenced */
        geo?: "true" | "false";
        /** @deprecated */
        id_please?: "true" | "false";
        /** Filter by observations that have community identifications */
        identified?: "true" | "false";
        /** Filter by observations of taxa that are introduced in their location */
        introduced?: "true" | "false";
        /** Filter by observations that show on map tiles */
        mappable?: "true" | "false";
        /** Filter by observations of taxa that are native to their location */
        native?: "true" | "false";
        /** Filter by observations of taxa that outside their known ranges */
        out_of_range?: "true" | "false";
        /** @deprecated */
        pcid?: "true" | "false";
        /** Filter by observations with photos */
        photos?: "true" | "false";
        /** Filter by observations that have been favorited by at least one user */
        popular?: "true" | "false";
        /** Filter by observations with sounds */
        sounds?: "true" | "false";
        /** Filter by observations of active taxa */
        taxon_is_active?: "true" | "false";
        /** Filter by whether the observed taxon has a conservation status of "threatened" or worse */
        threatened?: "true" | "false";
        /** Filter by whether observations are 'verifiable' (i.e. have quality grades `research` or `needs_id`) */
        verifiable?: "true" | "false";
        /** Include observations with this ID */
        id?: (string | number)[];
        /** Exclude observations with this ID */
        not_id?: string[];
        /** Include observations with this license */
        license?: (
          | "cc-by"
          | "cc-by-nc"
          | "cc-by-nd"
          | "cc-by-sa"
          | "cc-by-nc-nd"
          | "cc-by-nc-sa"
          | "cc0"
        )[];
        /** Include observations with least one photo with this license */
        photo_license?: (
          | "cc-by"
          | "cc-by-nc"
          | "cc-by-nd"
          | "cc-by-sa"
          | "cc-by-nc-nd"
          | "cc-by-nc-sa"
          | "cc0"
        )[];
        /** Include observations where the license attribute is not null, i.e. it is licensed */
        licensed?: "true" | "false";
        /** Include observations with at least one photo with a license attribute that is not null */
        photo_licensed?: "true" | "false";
        /** Include observations observed within the place with this ID */
        place_id?: (string | number)[];
        /** Include observations added to the project with this ID or slug */
        project_id?: (number | string)[];
        /** Filter by observers who trust the project(s) specified in `project_id` OR trust the authenticated viewer */
        coords_viewable_for_proj?: "true" | "false";
        /** Include observations of taxa with this rank */
        rank?: (
          | "stateofmatter"
          | "kingdom"
          | "phylum"
          | "subphylum"
          | "superclass"
          | "class"
          | "subclass"
          | "infraclass"
          | "subterclass"
          | "superorder"
          | "order"
          | "suborder"
          | "infraorder"
          | "parvorder"
          | "zoosection"
          | "zoosubsection"
          | "superfamily"
          | "epifamily"
          | "family"
          | "subfamily"
          | "supertribe"
          | "tribe"
          | "subtribe"
          | "genus"
          | "genushybrid"
          | "subgenus"
          | "section"
          | "subsection"
          | "complex"
          | "species"
          | "hybrid"
          | "subspecies"
          | "variety"
          | "form"
          | "infrahybrid"
        )[];
        /** Include observations affiliated with the iNaturalist network website with this ID */
        site_id?: number[];
        /** Include observations that have at least one sound with this license */
        sound_license?: (
          | "cc-by"
          | "cc-by-nc"
          | "cc-by-nd"
          | "cc-by-sa"
          | "cc-by-nc-nd"
          | "cc-by-nc-sa"
          | "cc0"
        )[];
        /** Include observations of this taxon and its descendants */
        taxon_id?: number[];
        /** Exclude observations of this taxon and its descendants */
        without_taxon_id?: number[];
        /** Include observations of taxa that have a scientific or common name matching this string */
        taxon_name?: string;
        /** Include observations observed by users that have this ID or login */
        user_id?: string[];
        /** Include observations observed by users that have this login */
        user_login?: string[];
        /** Include observations observed within this hour of the day */
        hour?: number[];
        /** Include observations observed within this day of the month */
        day?: number[];
        /** Include observations observed within this month */
        month?: number[];
        /** Include observations observed within this year */
        year?: number[];
        /** Include observations created within this day of the month */
        created_day?: number[];
        /** Include observations created within this month */
        created_month?: number[];
        /** Include observations created within this year */
        created_year?: number[];
        /** Include observations with annotations using this controlled term ID */
        term_id?: number[];
        /** Include observations with annotations using this controlled value ID. Must be combined with the `term_id` parameter */
        term_value_id?: number[];
        /** Exclude observations with annotations using this controlled value ID. Must be combined with the `term_id` parameter */
        without_term_value_id?: number[];
        /** Include observations with annotations using this controlled term ID and associated term value IDs, or be missing annotations using this controlled term ID. Must be combined with the `term_value_id` or `without_term_value_id` parameters */
        term_id_or_unknown?: number[];
        /** Include observations with an annotation created by this user */
        annotation_user_id?: string[];
        /** Include observations with a positional accuracy above this value (meters) */
        acc_above?: number;
        /** Include observations with a positional accuracy below this value (meters) */
        acc_below?: number;
        /** Include observations with a positional accuracy below this value (in meters) or with an unknown positional accuracy */
        acc_below_or_unknown?: number;
        /** Include observations observed on or after this date/time */
        d1?: string;
        /** Include observations observed on or before this date/time */
        d2?: string;
        /** Include observations created on or after this date/time */
        created_d1?: string;
        /** Include observations created on or before this date/time */
        created_d2?: string;
        /** Include observations created on this date */
        created_on?: string;
        /** Include observations observed on this date */
        observed_on?: string;
        /** Exclude observations of taxa previously observed by this user */
        unobserved_by_user_id?: string;
        /** Include observations that match the rules of the project with this ID or slug */
        apply_project_rules_for?: string;
        /** Include observations included in this observation accuracy experiment */
        observation_accuracy_experiment_id?: number[];
        /** Include observations of taxa that have this conservation status code. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
        cs?: string;
        /** Include observations of taxa that have a conservation status from this authority. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
        csa?: string;
        /** Include observations of taxa that have this IUCN conservation status. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
        csi?: ("LC" | "NT" | "VU" | "EN" | "CR" | "EW" | "EX")[];
        /** Include observations with this geoprivacy setting */
        geoprivacy?: ("obscured" | "obscured_private" | "open" | "private")[];
        /** Include observations where this is the most conservative geoprivacy applied by a conservation status associated with one of the taxa proposed in the current identifications */
        taxon_geoprivacy?: (
          | "obscured"
          | "obscured_private"
          | "open"
          | "private"
        )[];
        /** Include observations where `geoprivacy` or `taxon_geoprivacy` match these values */
        obscuration?: ("obscured" | "private" | "none")[];
        /** Include observations of taxa with this rank or lower */
        hrank?: (
          | "stateofmatter"
          | "kingdom"
          | "phylum"
          | "subphylum"
          | "superclass"
          | "class"
          | "subclass"
          | "infraclass"
          | "subterclass"
          | "superorder"
          | "order"
          | "suborder"
          | "infraorder"
          | "parvorder"
          | "zoosection"
          | "zoosubsection"
          | "superfamily"
          | "epifamily"
          | "family"
          | "subfamily"
          | "supertribe"
          | "tribe"
          | "subtribe"
          | "genus"
          | "genushybrid"
          | "subgenus"
          | "section"
          | "subsection"
          | "complex"
          | "species"
          | "hybrid"
          | "subspecies"
          | "variety"
          | "form"
          | "infrahybrid"
        )[];
        /** Include observations of taxa with this rank or higher */
        lrank?: (
          | "stateofmatter"
          | "kingdom"
          | "phylum"
          | "subphylum"
          | "superclass"
          | "class"
          | "subclass"
          | "infraclass"
          | "subterclass"
          | "superorder"
          | "order"
          | "suborder"
          | "infraorder"
          | "parvorder"
          | "zoosection"
          | "zoosubsection"
          | "superfamily"
          | "epifamily"
          | "family"
          | "subfamily"
          | "supertribe"
          | "tribe"
          | "subtribe"
          | "genus"
          | "genushybrid"
          | "subgenus"
          | "section"
          | "subsection"
          | "complex"
          | "species"
          | "hybrid"
          | "subspecies"
          | "variety"
          | "form"
          | "infrahybrid"
        )[];
        /** Include observations of taxa within this iconic taxon */
        iconic_taxa?: (
          | "Actinopterygii"
          | "Animalia"
          | "Amphibia"
          | "Arachnida"
          | "Aves"
          | "Chromista"
          | "Fungi"
          | "Insecta"
          | "Mammalia"
          | "Mollusca"
          | "Reptilia"
          | "Plantae"
          | "Protozoa"
          | "unknown"
        )[];
        /** Include observations with an ID above this value */
        id_above?: number;
        /** Include observations with an ID below this value */
        id_below?: number;
        /**
         * Include observations based on level of agreement among identifications:
         *
         * * **most_agree:** includes observations where there are more active identifications of taxa that agree with the Observation Taxon than active identifications that disagree with the Observation Taxon
         * * **some_agree:** includes observations where there are some active identifications of taxa that agree with the Observation Taxon
         * * **most_disagree:** includes observations where there are more active identifications of taxa that disagree with the Observation Taxon than active identifications that agree with the Observation Taxon
         */
        identifications?: "most_agree" | "most_disagree" | "some_agree";
        /** Include observations where there is disagreement among active identifications */
        disagreements?: "true" | "false";
        /**
         * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
         * @format float
         * @min -90
         * @max 90
         */
        lat?: number;
        /**
         * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
         * @format float
         * @min -180
         * @max 180
         */
        lng?: number;
        /**
         * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
         * @format float
         */
        radius?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -90
         * @max 90
         */
        nelat?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -180
         * @max 180
         */
        nelng?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -90
         * @max 90
         */
        swlat?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -180
         * @max 180
         */
        swlng?: number;
        /** Include observations of taxa in a list with this ID */
        list_id?: number;
        /** Exclude observations added to the project this ID or slug */
        not_in_project?: string[];
        /** Exclude observations that match the rules of the project with this ID or slug */
        not_matching_project_rules_for?: string;
        /** Include observations with a description, tags, or place_guess matching this query. Can be combined with `search_on` */
        q?: string;
        /** Include observations where any of these properties match the value of the `q` parameter */
        search_on?:
          | "names"
          | "tags"
          | "description"
          | "place"
          | "taxon_page_obs_photos";
        /** Include observations with this quality grade */
        quality_grade?: ("casual" | "needs_id" | "research")[];
        /** Exclude observations that are casual for any reason other than being marked captive */
        not_casual_excluding_captive?: "true" | "false";
        /** Exclude observations with this observation field */
        without_field?: string;
        /** Include observations with outlinks from this source */
        outlink_source?: string;
        /** Include observations updated since this time */
        updated_since?: string;
        /** Must be combined with the `reviewed` parameter */
        viewer_id?: number;
        /** Filter by observations reviewed by the user with ID matching the value of the `viewer_id` parameter */
        reviewed?: "true" | "false";
        /** Filter by observations expected to occur nearby their location according to the latest iNaturalist Geomodel */
        expected_nearby?: "true" | "false";
        /** Filter by observations voted as not accurately depicting an organism or scene */
        fails_dqa_accurate?: "true" | "false";
        /** Filter by observations voted as not having an accurate date */
        fails_dqa_date?: "true" | "false";
        /** Filter by observations voted as not evidence of an organism */
        fails_dqa_evidence?: "true" | "false";
        /** Filter by observations voted as not having an accurate location */
        fails_dqa_location?: "true" | "false";
        /** Filter by observations voted as the community ID cannot be improved */
        fails_dqa_needs_id?: "true" | "false";
        /** Filter by observations voted as not recent evidence of an organism */
        fails_dqa_recent?: "true" | "false";
        /** Filter by observations voted as not having evidence related to a single subject */
        fails_dqa_subject?: "true" | "false";
        /** Filter by observations voted as not wild */
        fails_dqa_wild?: "true" | "false";
        /** Include observations created by users created after a date. Accepts dates with or without times, e.g. 2025-01-01, as well as relative day, month, or year, e.g. 10d, 2w, 1y */
        user_after?: string;
        /** Include observations created by users created before a date. Accepts dates with or without times, e.g. 2025-01-01, as well as relative day, month, or year, e.g. 10d, 2w, 1y */
        user_before?: string;
        /** Returned taxon common names will be from this locale */
        locale?: string;
        /** Returned taxon common names will prioritize common names from this place */
        preferred_place_id?: number;
        /** Set the `Cache-Control` HTTP header with this value as `max-age`, in seconds. This means subsequent identical requests may be cached on  iNaturalist servers, and commonly within web browsers */
        ttl?: number;
        /**
         * Pagination `page` number
         * @min 0
         */
        page?: number;
        /** Number of results to return in a `page` */
        per_page?: number;
        /**
         * Sort order
         * @default "desc"
         */
        order?: "desc" | "asc";
        /**
         * Attribute to sort on
         * @default "created_at"
         */
        order_by?:
          | "created_at"
          | "geo_score"
          | "id"
          | "observed_on"
          | "random"
          | "species_guess"
          | "updated_at"
          | "votes";
        /** Include observations with this ID */
        only_id?: "true" | "false";
        /**
         * Attribute fields to return in the response
         * @example "species_guess,observed_on"
         */
        fields?: any;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultsObservationsIdentifiers, any>({
        path: `/observations/identifiers`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Observations
     * @name IdentificationCategoriesList
     * @summary Fetch observation identification category counts
     * @request GET:/observations/identification_categories
     * @secure
     */
    identificationCategoriesList: (
      query?: {
        fields?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultsObservationsIdentificationCategories, Error>({
        path: `/observations/identification_categories`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Observations
     * @name IconicTaxaSpeciesCountsList
     * @summary Fetch observation iconic taxon species counts
     * @request GET:/observations/iconic_taxa_species_counts
     * @secure
     */
    iconicTaxaSpeciesCountsList: (
      query?: {
        /** Filter by whether `positional_accuracy` is set or not */
        acc?: "true" | "false";
        /** Filter by captive / cultivated status */
        captive?: "true" | "false";
        /** Filter by whether the observation is in a place with a check list entry indicating the establishment means is `endemic` */
        endemic?: "true" | "false";
        /** Filter by observations that are georeferenced */
        geo?: "true" | "false";
        /** @deprecated */
        id_please?: "true" | "false";
        /** Filter by observations that have community identifications */
        identified?: "true" | "false";
        /** Filter by observations of taxa that are introduced in their location */
        introduced?: "true" | "false";
        /** Filter by observations that show on map tiles */
        mappable?: "true" | "false";
        /** Filter by observations of taxa that are native to their location */
        native?: "true" | "false";
        /** Filter by observations of taxa that outside their known ranges */
        out_of_range?: "true" | "false";
        /** @deprecated */
        pcid?: "true" | "false";
        /** Filter by observations with photos */
        photos?: "true" | "false";
        /** Filter by observations that have been favorited by at least one user */
        popular?: "true" | "false";
        /** Filter by observations with sounds */
        sounds?: "true" | "false";
        /** Filter by observations of active taxa */
        taxon_is_active?: "true" | "false";
        /** Filter by whether the observed taxon has a conservation status of "threatened" or worse */
        threatened?: "true" | "false";
        /** Filter by whether observations are 'verifiable' (i.e. have quality grades `research` or `needs_id`) */
        verifiable?: "true" | "false";
        /** Include observations with this ID */
        id?: (string | number)[];
        /** Exclude observations with this ID */
        not_id?: string[];
        /** Include observations with this license */
        license?: (
          | "cc-by"
          | "cc-by-nc"
          | "cc-by-nd"
          | "cc-by-sa"
          | "cc-by-nc-nd"
          | "cc-by-nc-sa"
          | "cc0"
        )[];
        /** Include observations with least one photo with this license */
        photo_license?: (
          | "cc-by"
          | "cc-by-nc"
          | "cc-by-nd"
          | "cc-by-sa"
          | "cc-by-nc-nd"
          | "cc-by-nc-sa"
          | "cc0"
        )[];
        /** Include observations where the license attribute is not null, i.e. it is licensed */
        licensed?: "true" | "false";
        /** Include observations with at least one photo with a license attribute that is not null */
        photo_licensed?: "true" | "false";
        /** Include observations observed within the place with this ID */
        place_id?: (string | number)[];
        /** Include observations added to the project with this ID or slug */
        project_id?: (number | string)[];
        /** Filter by observers who trust the project(s) specified in `project_id` OR trust the authenticated viewer */
        coords_viewable_for_proj?: "true" | "false";
        /** Include observations of taxa with this rank */
        rank?: (
          | "stateofmatter"
          | "kingdom"
          | "phylum"
          | "subphylum"
          | "superclass"
          | "class"
          | "subclass"
          | "infraclass"
          | "subterclass"
          | "superorder"
          | "order"
          | "suborder"
          | "infraorder"
          | "parvorder"
          | "zoosection"
          | "zoosubsection"
          | "superfamily"
          | "epifamily"
          | "family"
          | "subfamily"
          | "supertribe"
          | "tribe"
          | "subtribe"
          | "genus"
          | "genushybrid"
          | "subgenus"
          | "section"
          | "subsection"
          | "complex"
          | "species"
          | "hybrid"
          | "subspecies"
          | "variety"
          | "form"
          | "infrahybrid"
        )[];
        /** Include observations affiliated with the iNaturalist network website with this ID */
        site_id?: number[];
        /** Include observations that have at least one sound with this license */
        sound_license?: (
          | "cc-by"
          | "cc-by-nc"
          | "cc-by-nd"
          | "cc-by-sa"
          | "cc-by-nc-nd"
          | "cc-by-nc-sa"
          | "cc0"
        )[];
        /** Include observations of this taxon and its descendants */
        taxon_id?: number[];
        /** Exclude observations of this taxon and its descendants */
        without_taxon_id?: number[];
        /** Include observations of taxa that have a scientific or common name matching this string */
        taxon_name?: string;
        /** Include observations observed by users that have this ID or login */
        user_id?: string[];
        /** Include observations observed by users that have this login */
        user_login?: string[];
        /** Include observations observed within this hour of the day */
        hour?: number[];
        /** Include observations observed within this day of the month */
        day?: number[];
        /** Include observations observed within this month */
        month?: number[];
        /** Include observations observed within this year */
        year?: number[];
        /** Include observations created within this day of the month */
        created_day?: number[];
        /** Include observations created within this month */
        created_month?: number[];
        /** Include observations created within this year */
        created_year?: number[];
        /** Include observations with annotations using this controlled term ID */
        term_id?: number[];
        /** Include observations with annotations using this controlled value ID. Must be combined with the `term_id` parameter */
        term_value_id?: number[];
        /** Exclude observations with annotations using this controlled value ID. Must be combined with the `term_id` parameter */
        without_term_value_id?: number[];
        /** Include observations with annotations using this controlled term ID and associated term value IDs, or be missing annotations using this controlled term ID. Must be combined with the `term_value_id` or `without_term_value_id` parameters */
        term_id_or_unknown?: number[];
        /** Include observations with an annotation created by this user */
        annotation_user_id?: string[];
        /** Include observations with a positional accuracy above this value (meters) */
        acc_above?: number;
        /** Include observations with a positional accuracy below this value (meters) */
        acc_below?: number;
        /** Include observations with a positional accuracy below this value (in meters) or with an unknown positional accuracy */
        acc_below_or_unknown?: number;
        /** Include observations observed on or after this date/time */
        d1?: string;
        /** Include observations observed on or before this date/time */
        d2?: string;
        /** Include observations created on or after this date/time */
        created_d1?: string;
        /** Include observations created on or before this date/time */
        created_d2?: string;
        /** Include observations created on this date */
        created_on?: string;
        /** Include observations observed on this date */
        observed_on?: string;
        /** Exclude observations of taxa previously observed by this user */
        unobserved_by_user_id?: string;
        /** Include observations that match the rules of the project with this ID or slug */
        apply_project_rules_for?: string;
        /** Include observations included in this observation accuracy experiment */
        observation_accuracy_experiment_id?: number[];
        /** Include observations of taxa that have this conservation status code. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
        cs?: string;
        /** Include observations of taxa that have a conservation status from this authority. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
        csa?: string;
        /** Include observations of taxa that have this IUCN conservation status. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
        csi?: ("LC" | "NT" | "VU" | "EN" | "CR" | "EW" | "EX")[];
        /** Include observations with this geoprivacy setting */
        geoprivacy?: ("obscured" | "obscured_private" | "open" | "private")[];
        /** Include observations where this is the most conservative geoprivacy applied by a conservation status associated with one of the taxa proposed in the current identifications */
        taxon_geoprivacy?: (
          | "obscured"
          | "obscured_private"
          | "open"
          | "private"
        )[];
        /** Include observations where `geoprivacy` or `taxon_geoprivacy` match these values */
        obscuration?: ("obscured" | "private" | "none")[];
        /** Include observations of taxa with this rank or lower */
        hrank?: (
          | "stateofmatter"
          | "kingdom"
          | "phylum"
          | "subphylum"
          | "superclass"
          | "class"
          | "subclass"
          | "infraclass"
          | "subterclass"
          | "superorder"
          | "order"
          | "suborder"
          | "infraorder"
          | "parvorder"
          | "zoosection"
          | "zoosubsection"
          | "superfamily"
          | "epifamily"
          | "family"
          | "subfamily"
          | "supertribe"
          | "tribe"
          | "subtribe"
          | "genus"
          | "genushybrid"
          | "subgenus"
          | "section"
          | "subsection"
          | "complex"
          | "species"
          | "hybrid"
          | "subspecies"
          | "variety"
          | "form"
          | "infrahybrid"
        )[];
        /** Include observations of taxa with this rank or higher */
        lrank?: (
          | "stateofmatter"
          | "kingdom"
          | "phylum"
          | "subphylum"
          | "superclass"
          | "class"
          | "subclass"
          | "infraclass"
          | "subterclass"
          | "superorder"
          | "order"
          | "suborder"
          | "infraorder"
          | "parvorder"
          | "zoosection"
          | "zoosubsection"
          | "superfamily"
          | "epifamily"
          | "family"
          | "subfamily"
          | "supertribe"
          | "tribe"
          | "subtribe"
          | "genus"
          | "genushybrid"
          | "subgenus"
          | "section"
          | "subsection"
          | "complex"
          | "species"
          | "hybrid"
          | "subspecies"
          | "variety"
          | "form"
          | "infrahybrid"
        )[];
        /** Include observations of taxa within this iconic taxon */
        iconic_taxa?: (
          | "Actinopterygii"
          | "Animalia"
          | "Amphibia"
          | "Arachnida"
          | "Aves"
          | "Chromista"
          | "Fungi"
          | "Insecta"
          | "Mammalia"
          | "Mollusca"
          | "Reptilia"
          | "Plantae"
          | "Protozoa"
          | "unknown"
        )[];
        /** Include observations with an ID above this value */
        id_above?: number;
        /** Include observations with an ID below this value */
        id_below?: number;
        /**
         * Include observations based on level of agreement among identifications:
         *
         * * **most_agree:** includes observations where there are more active identifications of taxa that agree with the Observation Taxon than active identifications that disagree with the Observation Taxon
         * * **some_agree:** includes observations where there are some active identifications of taxa that agree with the Observation Taxon
         * * **most_disagree:** includes observations where there are more active identifications of taxa that disagree with the Observation Taxon than active identifications that agree with the Observation Taxon
         */
        identifications?: "most_agree" | "most_disagree" | "some_agree";
        /** Include observations where there is disagreement among active identifications */
        disagreements?: "true" | "false";
        /**
         * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
         * @format float
         * @min -90
         * @max 90
         */
        lat?: number;
        /**
         * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
         * @format float
         * @min -180
         * @max 180
         */
        lng?: number;
        /**
         * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
         * @format float
         */
        radius?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -90
         * @max 90
         */
        nelat?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -180
         * @max 180
         */
        nelng?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -90
         * @max 90
         */
        swlat?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -180
         * @max 180
         */
        swlng?: number;
        /** Include observations of taxa in a list with this ID */
        list_id?: number;
        /** Exclude observations added to the project this ID or slug */
        not_in_project?: string[];
        /** Exclude observations that match the rules of the project with this ID or slug */
        not_matching_project_rules_for?: string;
        /** Include observations with a description, tags, or place_guess matching this query. Can be combined with `search_on` */
        q?: string;
        /** Include observations where any of these properties match the value of the `q` parameter */
        search_on?:
          | "names"
          | "tags"
          | "description"
          | "place"
          | "taxon_page_obs_photos";
        /** Include observations with this quality grade */
        quality_grade?: ("casual" | "needs_id" | "research")[];
        /** Exclude observations that are casual for any reason other than being marked captive */
        not_casual_excluding_captive?: "true" | "false";
        /** Exclude observations with this observation field */
        without_field?: string;
        /** Include observations with outlinks from this source */
        outlink_source?: string;
        /** Include observations updated since this time */
        updated_since?: string;
        /** Must be combined with the `reviewed` parameter */
        viewer_id?: number;
        /** Filter by observations reviewed by the user with ID matching the value of the `viewer_id` parameter */
        reviewed?: "true" | "false";
        /** Filter by observations expected to occur nearby their location according to the latest iNaturalist Geomodel */
        expected_nearby?: "true" | "false";
        /** Filter by observations voted as not accurately depicting an organism or scene */
        fails_dqa_accurate?: "true" | "false";
        /** Filter by observations voted as not having an accurate date */
        fails_dqa_date?: "true" | "false";
        /** Filter by observations voted as not evidence of an organism */
        fails_dqa_evidence?: "true" | "false";
        /** Filter by observations voted as not having an accurate location */
        fails_dqa_location?: "true" | "false";
        /** Filter by observations voted as the community ID cannot be improved */
        fails_dqa_needs_id?: "true" | "false";
        /** Filter by observations voted as not recent evidence of an organism */
        fails_dqa_recent?: "true" | "false";
        /** Filter by observations voted as not having evidence related to a single subject */
        fails_dqa_subject?: "true" | "false";
        /** Filter by observations voted as not wild */
        fails_dqa_wild?: "true" | "false";
        /** Include observations created by users created after a date. Accepts dates with or without times, e.g. 2025-01-01, as well as relative day, month, or year, e.g. 10d, 2w, 1y */
        user_after?: string;
        /** Include observations created by users created before a date. Accepts dates with or without times, e.g. 2025-01-01, as well as relative day, month, or year, e.g. 10d, 2w, 1y */
        user_before?: string;
        /** Returned taxon common names will be from this locale */
        locale?: string;
        /** Returned taxon common names will prioritize common names from this place */
        preferred_place_id?: number;
        /** Set the `Cache-Control` HTTP header with this value as `max-age`, in seconds. This means subsequent identical requests may be cached on  iNaturalist servers, and commonly within web browsers */
        ttl?: number;
        /**
         * Pagination `page` number
         * @min 0
         */
        page?: number;
        /** Number of results to return in a `page` */
        per_page?: number;
        /**
         * Sort order
         * @default "desc"
         */
        order?: "desc" | "asc";
        /**
         * Attribute to sort on
         * @default "created_at"
         */
        order_by?:
          | "created_at"
          | "geo_score"
          | "id"
          | "observed_on"
          | "random"
          | "species_guess"
          | "updated_at"
          | "votes";
        /** Include observations with this ID */
        only_id?: "true" | "false";
        /**
         * Attribute fields to return in the response
         * @example "species_guess,observed_on"
         */
        fields?: any;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultsObservationsSpeciesCounts, any>({
        path: `/observations/iconic_taxa_species_counts`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Given zero to many of same parameters as the observation search API, returns observation counts grouped by iconic taxon. Results include an entry with a null taxon counting observations without an iconic taxon, equivalent to filtering observations with `iconic_taxa=unknown`
     *
     * @tags Observations
     * @name IconicTaxaCountsList
     * @summary Fetch observation counts by iconic taxon
     * @request GET:/observations/iconic_taxa_counts
     * @secure
     */
    iconicTaxaCountsList: (
      query?: {
        /** Filter by whether `positional_accuracy` is set or not */
        acc?: "true" | "false";
        /** Filter by captive / cultivated status */
        captive?: "true" | "false";
        /** Filter by whether the observation is in a place with a check list entry indicating the establishment means is `endemic` */
        endemic?: "true" | "false";
        /** Filter by observations that are georeferenced */
        geo?: "true" | "false";
        /** @deprecated */
        id_please?: "true" | "false";
        /** Filter by observations that have community identifications */
        identified?: "true" | "false";
        /** Filter by observations of taxa that are introduced in their location */
        introduced?: "true" | "false";
        /** Filter by observations that show on map tiles */
        mappable?: "true" | "false";
        /** Filter by observations of taxa that are native to their location */
        native?: "true" | "false";
        /** Filter by observations of taxa that outside their known ranges */
        out_of_range?: "true" | "false";
        /** @deprecated */
        pcid?: "true" | "false";
        /** Filter by observations with photos */
        photos?: "true" | "false";
        /** Filter by observations that have been favorited by at least one user */
        popular?: "true" | "false";
        /** Filter by observations with sounds */
        sounds?: "true" | "false";
        /** Filter by observations of active taxa */
        taxon_is_active?: "true" | "false";
        /** Filter by whether the observed taxon has a conservation status of "threatened" or worse */
        threatened?: "true" | "false";
        /** Filter by whether observations are 'verifiable' (i.e. have quality grades `research` or `needs_id`) */
        verifiable?: "true" | "false";
        /** Include observations with this ID */
        id?: (string | number)[];
        /** Exclude observations with this ID */
        not_id?: string[];
        /** Include observations with this license */
        license?: (
          | "cc-by"
          | "cc-by-nc"
          | "cc-by-nd"
          | "cc-by-sa"
          | "cc-by-nc-nd"
          | "cc-by-nc-sa"
          | "cc0"
        )[];
        /** Include observations with least one photo with this license */
        photo_license?: (
          | "cc-by"
          | "cc-by-nc"
          | "cc-by-nd"
          | "cc-by-sa"
          | "cc-by-nc-nd"
          | "cc-by-nc-sa"
          | "cc0"
        )[];
        /** Include observations where the license attribute is not null, i.e. it is licensed */
        licensed?: "true" | "false";
        /** Include observations with at least one photo with a license attribute that is not null */
        photo_licensed?: "true" | "false";
        /** Include observations observed within the place with this ID */
        place_id?: (string | number)[];
        /** Include observations added to the project with this ID or slug */
        project_id?: (number | string)[];
        /** Filter by observers who trust the project(s) specified in `project_id` OR trust the authenticated viewer */
        coords_viewable_for_proj?: "true" | "false";
        /** Include observations of taxa with this rank */
        rank?: (
          | "stateofmatter"
          | "kingdom"
          | "phylum"
          | "subphylum"
          | "superclass"
          | "class"
          | "subclass"
          | "infraclass"
          | "subterclass"
          | "superorder"
          | "order"
          | "suborder"
          | "infraorder"
          | "parvorder"
          | "zoosection"
          | "zoosubsection"
          | "superfamily"
          | "epifamily"
          | "family"
          | "subfamily"
          | "supertribe"
          | "tribe"
          | "subtribe"
          | "genus"
          | "genushybrid"
          | "subgenus"
          | "section"
          | "subsection"
          | "complex"
          | "species"
          | "hybrid"
          | "subspecies"
          | "variety"
          | "form"
          | "infrahybrid"
        )[];
        /** Include observations affiliated with the iNaturalist network website with this ID */
        site_id?: number[];
        /** Include observations that have at least one sound with this license */
        sound_license?: (
          | "cc-by"
          | "cc-by-nc"
          | "cc-by-nd"
          | "cc-by-sa"
          | "cc-by-nc-nd"
          | "cc-by-nc-sa"
          | "cc0"
        )[];
        /** Include observations of this taxon and its descendants */
        taxon_id?: number[];
        /** Exclude observations of this taxon and its descendants */
        without_taxon_id?: number[];
        /** Include observations of taxa that have a scientific or common name matching this string */
        taxon_name?: string;
        /** Include observations observed by users that have this ID or login */
        user_id?: string[];
        /** Include observations observed by users that have this login */
        user_login?: string[];
        /** Include observations observed within this hour of the day */
        hour?: number[];
        /** Include observations observed within this day of the month */
        day?: number[];
        /** Include observations observed within this month */
        month?: number[];
        /** Include observations observed within this year */
        year?: number[];
        /** Include observations created within this day of the month */
        created_day?: number[];
        /** Include observations created within this month */
        created_month?: number[];
        /** Include observations created within this year */
        created_year?: number[];
        /** Include observations with annotations using this controlled term ID */
        term_id?: number[];
        /** Include observations with annotations using this controlled value ID. Must be combined with the `term_id` parameter */
        term_value_id?: number[];
        /** Exclude observations with annotations using this controlled value ID. Must be combined with the `term_id` parameter */
        without_term_value_id?: number[];
        /** Include observations with annotations using this controlled term ID and associated term value IDs, or be missing annotations using this controlled term ID. Must be combined with the `term_value_id` or `without_term_value_id` parameters */
        term_id_or_unknown?: number[];
        /** Include observations with an annotation created by this user */
        annotation_user_id?: string[];
        /** Include observations with a positional accuracy above this value (meters) */
        acc_above?: number;
        /** Include observations with a positional accuracy below this value (meters) */
        acc_below?: number;
        /** Include observations with a positional accuracy below this value (in meters) or with an unknown positional accuracy */
        acc_below_or_unknown?: number;
        /** Include observations observed on or after this date/time */
        d1?: string;
        /** Include observations observed on or before this date/time */
        d2?: string;
        /** Include observations created on or after this date/time */
        created_d1?: string;
        /** Include observations created on or before this date/time */
        created_d2?: string;
        /** Include observations created on this date */
        created_on?: string;
        /** Include observations observed on this date */
        observed_on?: string;
        /** Exclude observations of taxa previously observed by this user */
        unobserved_by_user_id?: string;
        /** Include observations that match the rules of the project with this ID or slug */
        apply_project_rules_for?: string;
        /** Include observations included in this observation accuracy experiment */
        observation_accuracy_experiment_id?: number[];
        /** Include observations of taxa that have this conservation status code. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
        cs?: string;
        /** Include observations of taxa that have a conservation status from this authority. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
        csa?: string;
        /** Include observations of taxa that have this IUCN conservation status. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
        csi?: ("LC" | "NT" | "VU" | "EN" | "CR" | "EW" | "EX")[];
        /** Include observations with this geoprivacy setting */
        geoprivacy?: ("obscured" | "obscured_private" | "open" | "private")[];
        /** Include observations where this is the most conservative geoprivacy applied by a conservation status associated with one of the taxa proposed in the current identifications */
        taxon_geoprivacy?: (
          | "obscured"
          | "obscured_private"
          | "open"
          | "private"
        )[];
        /** Include observations where `geoprivacy` or `taxon_geoprivacy` match these values */
        obscuration?: ("obscured" | "private" | "none")[];
        /** Include observations of taxa with this rank or lower */
        hrank?: (
          | "stateofmatter"
          | "kingdom"
          | "phylum"
          | "subphylum"
          | "superclass"
          | "class"
          | "subclass"
          | "infraclass"
          | "subterclass"
          | "superorder"
          | "order"
          | "suborder"
          | "infraorder"
          | "parvorder"
          | "zoosection"
          | "zoosubsection"
          | "superfamily"
          | "epifamily"
          | "family"
          | "subfamily"
          | "supertribe"
          | "tribe"
          | "subtribe"
          | "genus"
          | "genushybrid"
          | "subgenus"
          | "section"
          | "subsection"
          | "complex"
          | "species"
          | "hybrid"
          | "subspecies"
          | "variety"
          | "form"
          | "infrahybrid"
        )[];
        /** Include observations of taxa with this rank or higher */
        lrank?: (
          | "stateofmatter"
          | "kingdom"
          | "phylum"
          | "subphylum"
          | "superclass"
          | "class"
          | "subclass"
          | "infraclass"
          | "subterclass"
          | "superorder"
          | "order"
          | "suborder"
          | "infraorder"
          | "parvorder"
          | "zoosection"
          | "zoosubsection"
          | "superfamily"
          | "epifamily"
          | "family"
          | "subfamily"
          | "supertribe"
          | "tribe"
          | "subtribe"
          | "genus"
          | "genushybrid"
          | "subgenus"
          | "section"
          | "subsection"
          | "complex"
          | "species"
          | "hybrid"
          | "subspecies"
          | "variety"
          | "form"
          | "infrahybrid"
        )[];
        /** Include observations of taxa within this iconic taxon */
        iconic_taxa?: (
          | "Actinopterygii"
          | "Animalia"
          | "Amphibia"
          | "Arachnida"
          | "Aves"
          | "Chromista"
          | "Fungi"
          | "Insecta"
          | "Mammalia"
          | "Mollusca"
          | "Reptilia"
          | "Plantae"
          | "Protozoa"
          | "unknown"
        )[];
        /** Include observations with an ID above this value */
        id_above?: number;
        /** Include observations with an ID below this value */
        id_below?: number;
        /**
         * Include observations based on level of agreement among identifications:
         *
         * * **most_agree:** includes observations where there are more active identifications of taxa that agree with the Observation Taxon than active identifications that disagree with the Observation Taxon
         * * **some_agree:** includes observations where there are some active identifications of taxa that agree with the Observation Taxon
         * * **most_disagree:** includes observations where there are more active identifications of taxa that disagree with the Observation Taxon than active identifications that agree with the Observation Taxon
         */
        identifications?: "most_agree" | "most_disagree" | "some_agree";
        /** Include observations where there is disagreement among active identifications */
        disagreements?: "true" | "false";
        /**
         * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
         * @format float
         * @min -90
         * @max 90
         */
        lat?: number;
        /**
         * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
         * @format float
         * @min -180
         * @max 180
         */
        lng?: number;
        /**
         * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
         * @format float
         */
        radius?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -90
         * @max 90
         */
        nelat?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -180
         * @max 180
         */
        nelng?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -90
         * @max 90
         */
        swlat?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -180
         * @max 180
         */
        swlng?: number;
        /** Include observations of taxa in a list with this ID */
        list_id?: number;
        /** Exclude observations added to the project this ID or slug */
        not_in_project?: string[];
        /** Exclude observations that match the rules of the project with this ID or slug */
        not_matching_project_rules_for?: string;
        /** Include observations with a description, tags, or place_guess matching this query. Can be combined with `search_on` */
        q?: string;
        /** Include observations where any of these properties match the value of the `q` parameter */
        search_on?:
          | "names"
          | "tags"
          | "description"
          | "place"
          | "taxon_page_obs_photos";
        /** Include observations with this quality grade */
        quality_grade?: ("casual" | "needs_id" | "research")[];
        /** Exclude observations that are casual for any reason other than being marked captive */
        not_casual_excluding_captive?: "true" | "false";
        /** Exclude observations with this observation field */
        without_field?: string;
        /** Include observations with outlinks from this source */
        outlink_source?: string;
        /** Include observations updated since this time */
        updated_since?: string;
        /** Must be combined with the `reviewed` parameter */
        viewer_id?: number;
        /** Filter by observations reviewed by the user with ID matching the value of the `viewer_id` parameter */
        reviewed?: "true" | "false";
        /** Filter by observations expected to occur nearby their location according to the latest iNaturalist Geomodel */
        expected_nearby?: "true" | "false";
        /** Filter by observations voted as not accurately depicting an organism or scene */
        fails_dqa_accurate?: "true" | "false";
        /** Filter by observations voted as not having an accurate date */
        fails_dqa_date?: "true" | "false";
        /** Filter by observations voted as not evidence of an organism */
        fails_dqa_evidence?: "true" | "false";
        /** Filter by observations voted as not having an accurate location */
        fails_dqa_location?: "true" | "false";
        /** Filter by observations voted as the community ID cannot be improved */
        fails_dqa_needs_id?: "true" | "false";
        /** Filter by observations voted as not recent evidence of an organism */
        fails_dqa_recent?: "true" | "false";
        /** Filter by observations voted as not having evidence related to a single subject */
        fails_dqa_subject?: "true" | "false";
        /** Filter by observations voted as not wild */
        fails_dqa_wild?: "true" | "false";
        /** Include observations created by users created after a date. Accepts dates with or without times, e.g. 2025-01-01, as well as relative day, month, or year, e.g. 10d, 2w, 1y */
        user_after?: string;
        /** Include observations created by users created before a date. Accepts dates with or without times, e.g. 2025-01-01, as well as relative day, month, or year, e.g. 10d, 2w, 1y */
        user_before?: string;
        /** Returned taxon common names will be from this locale */
        locale?: string;
        /** Returned taxon common names will prioritize common names from this place */
        preferred_place_id?: number;
        /** Set the `Cache-Control` HTTP header with this value as `max-age`, in seconds. This means subsequent identical requests may be cached on  iNaturalist servers, and commonly within web browsers */
        ttl?: number;
        /**
         * Pagination `page` number
         * @min 0
         */
        page?: number;
        /** Number of results to return in a `page` */
        per_page?: number;
        /**
         * Sort order
         * @default "desc"
         */
        order?: "desc" | "asc";
        /**
         * Attribute to sort on
         * @default "created_at"
         */
        order_by?:
          | "created_at"
          | "geo_score"
          | "id"
          | "observed_on"
          | "random"
          | "species_guess"
          | "updated_at"
          | "votes";
        /** Include observations with this ID */
        only_id?: "true" | "false";
        /**
         * Attribute fields to return in the response
         * @example "species_guess,observed_on"
         */
        fields?: any;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultsObservationsIconicTaxaCounts, any>({
        path: `/observations/iconic_taxa_counts`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Observations
     * @name HistogramList
     * @summary Fetch observation histograms
     * @request GET:/observations/histogram
     * @secure
     */
    histogramList: (
      query?: {
        /** Filter by whether `positional_accuracy` is set or not */
        acc?: "true" | "false";
        /** Filter by captive / cultivated status */
        captive?: "true" | "false";
        /** Filter by whether the observation is in a place with a check list entry indicating the establishment means is `endemic` */
        endemic?: "true" | "false";
        /** Filter by observations that are georeferenced */
        geo?: "true" | "false";
        /** @deprecated */
        id_please?: "true" | "false";
        /** Filter by observations that have community identifications */
        identified?: "true" | "false";
        /** Filter by observations of taxa that are introduced in their location */
        introduced?: "true" | "false";
        /** Filter by observations that show on map tiles */
        mappable?: "true" | "false";
        /** Filter by observations of taxa that are native to their location */
        native?: "true" | "false";
        /** Filter by observations of taxa that outside their known ranges */
        out_of_range?: "true" | "false";
        /** @deprecated */
        pcid?: "true" | "false";
        /** Filter by observations with photos */
        photos?: "true" | "false";
        /** Filter by observations that have been favorited by at least one user */
        popular?: "true" | "false";
        /** Filter by observations with sounds */
        sounds?: "true" | "false";
        /** Filter by observations of active taxa */
        taxon_is_active?: "true" | "false";
        /** Filter by whether the observed taxon has a conservation status of "threatened" or worse */
        threatened?: "true" | "false";
        /** Filter by whether observations are 'verifiable' (i.e. have quality grades `research` or `needs_id`) */
        verifiable?: "true" | "false";
        /** Include observations with this ID */
        id?: (string | number)[];
        /** Exclude observations with this ID */
        not_id?: string[];
        /** Include observations with this license */
        license?: (
          | "cc-by"
          | "cc-by-nc"
          | "cc-by-nd"
          | "cc-by-sa"
          | "cc-by-nc-nd"
          | "cc-by-nc-sa"
          | "cc0"
        )[];
        /** Include observations with least one photo with this license */
        photo_license?: (
          | "cc-by"
          | "cc-by-nc"
          | "cc-by-nd"
          | "cc-by-sa"
          | "cc-by-nc-nd"
          | "cc-by-nc-sa"
          | "cc0"
        )[];
        /** Include observations where the license attribute is not null, i.e. it is licensed */
        licensed?: "true" | "false";
        /** Include observations with at least one photo with a license attribute that is not null */
        photo_licensed?: "true" | "false";
        /** Include observations observed within the place with this ID */
        place_id?: (string | number)[];
        /** Include observations added to the project with this ID or slug */
        project_id?: (number | string)[];
        /** Filter by observers who trust the project(s) specified in `project_id` OR trust the authenticated viewer */
        coords_viewable_for_proj?: "true" | "false";
        /** Include observations of taxa with this rank */
        rank?: (
          | "stateofmatter"
          | "kingdom"
          | "phylum"
          | "subphylum"
          | "superclass"
          | "class"
          | "subclass"
          | "infraclass"
          | "subterclass"
          | "superorder"
          | "order"
          | "suborder"
          | "infraorder"
          | "parvorder"
          | "zoosection"
          | "zoosubsection"
          | "superfamily"
          | "epifamily"
          | "family"
          | "subfamily"
          | "supertribe"
          | "tribe"
          | "subtribe"
          | "genus"
          | "genushybrid"
          | "subgenus"
          | "section"
          | "subsection"
          | "complex"
          | "species"
          | "hybrid"
          | "subspecies"
          | "variety"
          | "form"
          | "infrahybrid"
        )[];
        /** Include observations affiliated with the iNaturalist network website with this ID */
        site_id?: number[];
        /** Include observations that have at least one sound with this license */
        sound_license?: (
          | "cc-by"
          | "cc-by-nc"
          | "cc-by-nd"
          | "cc-by-sa"
          | "cc-by-nc-nd"
          | "cc-by-nc-sa"
          | "cc0"
        )[];
        /** Include observations of this taxon and its descendants */
        taxon_id?: number[];
        /** Exclude observations of this taxon and its descendants */
        without_taxon_id?: number[];
        /** Include observations of taxa that have a scientific or common name matching this string */
        taxon_name?: string;
        /** Include observations observed by users that have this ID or login */
        user_id?: string[];
        /** Include observations observed by users that have this login */
        user_login?: string[];
        /** Include observations observed within this hour of the day */
        hour?: number[];
        /** Include observations observed within this day of the month */
        day?: number[];
        /** Include observations observed within this month */
        month?: number[];
        /** Include observations observed within this year */
        year?: number[];
        /** Include observations created within this day of the month */
        created_day?: number[];
        /** Include observations created within this month */
        created_month?: number[];
        /** Include observations created within this year */
        created_year?: number[];
        /** Include observations with annotations using this controlled term ID */
        term_id?: number[];
        /** Include observations with annotations using this controlled value ID. Must be combined with the `term_id` parameter */
        term_value_id?: number[];
        /** Exclude observations with annotations using this controlled value ID. Must be combined with the `term_id` parameter */
        without_term_value_id?: number[];
        /** Include observations with annotations using this controlled term ID and associated term value IDs, or be missing annotations using this controlled term ID. Must be combined with the `term_value_id` or `without_term_value_id` parameters */
        term_id_or_unknown?: number[];
        /** Include observations with an annotation created by this user */
        annotation_user_id?: string[];
        /** Include observations with a positional accuracy above this value (meters) */
        acc_above?: number;
        /** Include observations with a positional accuracy below this value (meters) */
        acc_below?: number;
        /** Include observations with a positional accuracy below this value (in meters) or with an unknown positional accuracy */
        acc_below_or_unknown?: number;
        /** Include observations observed on or after this date/time */
        d1?: string;
        /** Include observations observed on or before this date/time */
        d2?: string;
        /** Include observations created on or after this date/time */
        created_d1?: string;
        /** Include observations created on or before this date/time */
        created_d2?: string;
        /** Include observations created on this date */
        created_on?: string;
        /** Include observations observed on this date */
        observed_on?: string;
        /** Exclude observations of taxa previously observed by this user */
        unobserved_by_user_id?: string;
        /** Include observations that match the rules of the project with this ID or slug */
        apply_project_rules_for?: string;
        /** Include observations included in this observation accuracy experiment */
        observation_accuracy_experiment_id?: number[];
        /** Include observations of taxa that have this conservation status code. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
        cs?: string;
        /** Include observations of taxa that have a conservation status from this authority. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
        csa?: string;
        /** Include observations of taxa that have this IUCN conservation status. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
        csi?: ("LC" | "NT" | "VU" | "EN" | "CR" | "EW" | "EX")[];
        /** Include observations with this geoprivacy setting */
        geoprivacy?: ("obscured" | "obscured_private" | "open" | "private")[];
        /** Include observations where this is the most conservative geoprivacy applied by a conservation status associated with one of the taxa proposed in the current identifications */
        taxon_geoprivacy?: (
          | "obscured"
          | "obscured_private"
          | "open"
          | "private"
        )[];
        /** Include observations where `geoprivacy` or `taxon_geoprivacy` match these values */
        obscuration?: ("obscured" | "private" | "none")[];
        /** Include observations of taxa with this rank or lower */
        hrank?: (
          | "stateofmatter"
          | "kingdom"
          | "phylum"
          | "subphylum"
          | "superclass"
          | "class"
          | "subclass"
          | "infraclass"
          | "subterclass"
          | "superorder"
          | "order"
          | "suborder"
          | "infraorder"
          | "parvorder"
          | "zoosection"
          | "zoosubsection"
          | "superfamily"
          | "epifamily"
          | "family"
          | "subfamily"
          | "supertribe"
          | "tribe"
          | "subtribe"
          | "genus"
          | "genushybrid"
          | "subgenus"
          | "section"
          | "subsection"
          | "complex"
          | "species"
          | "hybrid"
          | "subspecies"
          | "variety"
          | "form"
          | "infrahybrid"
        )[];
        /** Include observations of taxa with this rank or higher */
        lrank?: (
          | "stateofmatter"
          | "kingdom"
          | "phylum"
          | "subphylum"
          | "superclass"
          | "class"
          | "subclass"
          | "infraclass"
          | "subterclass"
          | "superorder"
          | "order"
          | "suborder"
          | "infraorder"
          | "parvorder"
          | "zoosection"
          | "zoosubsection"
          | "superfamily"
          | "epifamily"
          | "family"
          | "subfamily"
          | "supertribe"
          | "tribe"
          | "subtribe"
          | "genus"
          | "genushybrid"
          | "subgenus"
          | "section"
          | "subsection"
          | "complex"
          | "species"
          | "hybrid"
          | "subspecies"
          | "variety"
          | "form"
          | "infrahybrid"
        )[];
        /** Include observations of taxa within this iconic taxon */
        iconic_taxa?: (
          | "Actinopterygii"
          | "Animalia"
          | "Amphibia"
          | "Arachnida"
          | "Aves"
          | "Chromista"
          | "Fungi"
          | "Insecta"
          | "Mammalia"
          | "Mollusca"
          | "Reptilia"
          | "Plantae"
          | "Protozoa"
          | "unknown"
        )[];
        /** Include observations with an ID above this value */
        id_above?: number;
        /** Include observations with an ID below this value */
        id_below?: number;
        /**
         * Include observations based on level of agreement among identifications:
         *
         * * **most_agree:** includes observations where there are more active identifications of taxa that agree with the Observation Taxon than active identifications that disagree with the Observation Taxon
         * * **some_agree:** includes observations where there are some active identifications of taxa that agree with the Observation Taxon
         * * **most_disagree:** includes observations where there are more active identifications of taxa that disagree with the Observation Taxon than active identifications that agree with the Observation Taxon
         */
        identifications?: "most_agree" | "most_disagree" | "some_agree";
        /** Include observations where there is disagreement among active identifications */
        disagreements?: "true" | "false";
        /**
         * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
         * @format float
         * @min -90
         * @max 90
         */
        lat?: number;
        /**
         * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
         * @format float
         * @min -180
         * @max 180
         */
        lng?: number;
        /**
         * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
         * @format float
         */
        radius?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -90
         * @max 90
         */
        nelat?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -180
         * @max 180
         */
        nelng?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -90
         * @max 90
         */
        swlat?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -180
         * @max 180
         */
        swlng?: number;
        /** Include observations of taxa in a list with this ID */
        list_id?: number;
        /** Exclude observations added to the project this ID or slug */
        not_in_project?: string[];
        /** Exclude observations that match the rules of the project with this ID or slug */
        not_matching_project_rules_for?: string;
        /** Include observations with a description, tags, or place_guess matching this query. Can be combined with `search_on` */
        q?: string;
        /** Include observations where any of these properties match the value of the `q` parameter */
        search_on?:
          | "names"
          | "tags"
          | "description"
          | "place"
          | "taxon_page_obs_photos";
        /** Include observations with this quality grade */
        quality_grade?: ("casual" | "needs_id" | "research")[];
        /** Exclude observations that are casual for any reason other than being marked captive */
        not_casual_excluding_captive?: "true" | "false";
        /** Exclude observations with this observation field */
        without_field?: string;
        /** Include observations with outlinks from this source */
        outlink_source?: string;
        /** Include observations updated since this time */
        updated_since?: string;
        /** Must be combined with the `reviewed` parameter */
        viewer_id?: number;
        /** Filter by observations reviewed by the user with ID matching the value of the `viewer_id` parameter */
        reviewed?: "true" | "false";
        /** Filter by observations expected to occur nearby their location according to the latest iNaturalist Geomodel */
        expected_nearby?: "true" | "false";
        /** Filter by observations voted as not accurately depicting an organism or scene */
        fails_dqa_accurate?: "true" | "false";
        /** Filter by observations voted as not having an accurate date */
        fails_dqa_date?: "true" | "false";
        /** Filter by observations voted as not evidence of an organism */
        fails_dqa_evidence?: "true" | "false";
        /** Filter by observations voted as not having an accurate location */
        fails_dqa_location?: "true" | "false";
        /** Filter by observations voted as the community ID cannot be improved */
        fails_dqa_needs_id?: "true" | "false";
        /** Filter by observations voted as not recent evidence of an organism */
        fails_dqa_recent?: "true" | "false";
        /** Filter by observations voted as not having evidence related to a single subject */
        fails_dqa_subject?: "true" | "false";
        /** Filter by observations voted as not wild */
        fails_dqa_wild?: "true" | "false";
        /** Include observations created by users created after a date. Accepts dates with or without times, e.g. 2025-01-01, as well as relative day, month, or year, e.g. 10d, 2w, 1y */
        user_after?: string;
        /** Include observations created by users created before a date. Accepts dates with or without times, e.g. 2025-01-01, as well as relative day, month, or year, e.g. 10d, 2w, 1y */
        user_before?: string;
        /** Returned taxon common names will be from this locale */
        locale?: string;
        /** Returned taxon common names will prioritize common names from this place */
        preferred_place_id?: number;
        /** Set the `Cache-Control` HTTP header with this value as `max-age`, in seconds. This means subsequent identical requests may be cached on  iNaturalist servers, and commonly within web browsers */
        ttl?: number;
        /**
         * Pagination `page` number
         * @min 0
         */
        page?: number;
        /** Number of results to return in a `page` */
        per_page?: number;
        /**
         * Sort order
         * @default "desc"
         */
        order?: "desc" | "asc";
        /**
         * Attribute to sort on
         * @default "created_at"
         */
        order_by?:
          | "created_at"
          | "geo_score"
          | "id"
          | "observed_on"
          | "random"
          | "species_guess"
          | "updated_at"
          | "votes";
        /** Include observations with this ID */
        only_id?: "true" | "false";
        /**
         * Attribute fields to return in the response
         * @example "species_guess,observed_on"
         */
        fields?: any;
        /** @default "observed" */
        date_field?: "observed" | "created";
        /** @default "month_of_year" */
        interval?:
          | "year"
          | "month"
          | "week"
          | "day"
          | "hour"
          | "month_of_year"
          | "week_of_year";
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultsObservationsHistogram, any>({
        path: `/observations/histogram`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Observations
     * @name DeletedList
     * @summary Fetch IDs of observations deleted by the authenticated user
     * @request GET:/observations/deleted
     * @secure
     */
    deletedList: (
      query: {
        fields?: any;
        /** @format date */
        since: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultsObservationsDeleted, any>({
        path: `/observations/deleted`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Observations
     * @name ObservationsList
     * @summary Search observations
     * @request GET:/observations
     * @secure
     */
    observationsList: (
      query?: {
        /** Filter by whether `positional_accuracy` is set or not */
        acc?: "true" | "false";
        /** Filter by captive / cultivated status */
        captive?: "true" | "false";
        /** Filter by whether the observation is in a place with a check list entry indicating the establishment means is `endemic` */
        endemic?: "true" | "false";
        /** Filter by observations that are georeferenced */
        geo?: "true" | "false";
        /** @deprecated */
        id_please?: "true" | "false";
        /** Filter by observations that have community identifications */
        identified?: "true" | "false";
        /** Filter by observations of taxa that are introduced in their location */
        introduced?: "true" | "false";
        /** Filter by observations that show on map tiles */
        mappable?: "true" | "false";
        /** Filter by observations of taxa that are native to their location */
        native?: "true" | "false";
        /** Filter by observations of taxa that outside their known ranges */
        out_of_range?: "true" | "false";
        /** @deprecated */
        pcid?: "true" | "false";
        /** Filter by observations with photos */
        photos?: "true" | "false";
        /** Filter by observations that have been favorited by at least one user */
        popular?: "true" | "false";
        /** Filter by observations with sounds */
        sounds?: "true" | "false";
        /** Filter by observations of active taxa */
        taxon_is_active?: "true" | "false";
        /** Filter by whether the observed taxon has a conservation status of "threatened" or worse */
        threatened?: "true" | "false";
        /** Filter by whether observations are 'verifiable' (i.e. have quality grades `research` or `needs_id`) */
        verifiable?: "true" | "false";
        /** Include observations with this ID */
        id?: (string | number)[];
        /** Exclude observations with this ID */
        not_id?: string[];
        /** Include observations with this license */
        license?: (
          | "cc-by"
          | "cc-by-nc"
          | "cc-by-nd"
          | "cc-by-sa"
          | "cc-by-nc-nd"
          | "cc-by-nc-sa"
          | "cc0"
        )[];
        /** Include observations with least one photo with this license */
        photo_license?: (
          | "cc-by"
          | "cc-by-nc"
          | "cc-by-nd"
          | "cc-by-sa"
          | "cc-by-nc-nd"
          | "cc-by-nc-sa"
          | "cc0"
        )[];
        /** Include observations where the license attribute is not null, i.e. it is licensed */
        licensed?: "true" | "false";
        /** Include observations with at least one photo with a license attribute that is not null */
        photo_licensed?: "true" | "false";
        /** Include observations observed within the place with this ID */
        place_id?: (string | number)[];
        /** Include observations added to the project with this ID or slug */
        project_id?: (number | string)[];
        /** Filter by observers who trust the project(s) specified in `project_id` OR trust the authenticated viewer */
        coords_viewable_for_proj?: "true" | "false";
        /** Include observations of taxa with this rank */
        rank?: (
          | "stateofmatter"
          | "kingdom"
          | "phylum"
          | "subphylum"
          | "superclass"
          | "class"
          | "subclass"
          | "infraclass"
          | "subterclass"
          | "superorder"
          | "order"
          | "suborder"
          | "infraorder"
          | "parvorder"
          | "zoosection"
          | "zoosubsection"
          | "superfamily"
          | "epifamily"
          | "family"
          | "subfamily"
          | "supertribe"
          | "tribe"
          | "subtribe"
          | "genus"
          | "genushybrid"
          | "subgenus"
          | "section"
          | "subsection"
          | "complex"
          | "species"
          | "hybrid"
          | "subspecies"
          | "variety"
          | "form"
          | "infrahybrid"
        )[];
        /** Include observations affiliated with the iNaturalist network website with this ID */
        site_id?: number[];
        /** Include observations that have at least one sound with this license */
        sound_license?: (
          | "cc-by"
          | "cc-by-nc"
          | "cc-by-nd"
          | "cc-by-sa"
          | "cc-by-nc-nd"
          | "cc-by-nc-sa"
          | "cc0"
        )[];
        /** Include observations of this taxon and its descendants */
        taxon_id?: number[];
        /** Exclude observations of this taxon and its descendants */
        without_taxon_id?: number[];
        /** Include observations of taxa that have a scientific or common name matching this string */
        taxon_name?: string;
        /** Include observations observed by users that have this ID or login */
        user_id?: string[];
        /** Include observations observed by users that have this login */
        user_login?: string[];
        /** Include observations observed within this hour of the day */
        hour?: number[];
        /** Include observations observed within this day of the month */
        day?: number[];
        /** Include observations observed within this month */
        month?: number[];
        /** Include observations observed within this year */
        year?: number[];
        /** Include observations created within this day of the month */
        created_day?: number[];
        /** Include observations created within this month */
        created_month?: number[];
        /** Include observations created within this year */
        created_year?: number[];
        /** Include observations with annotations using this controlled term ID */
        term_id?: number[];
        /** Include observations with annotations using this controlled value ID. Must be combined with the `term_id` parameter */
        term_value_id?: number[];
        /** Exclude observations with annotations using this controlled value ID. Must be combined with the `term_id` parameter */
        without_term_value_id?: number[];
        /** Include observations with annotations using this controlled term ID and associated term value IDs, or be missing annotations using this controlled term ID. Must be combined with the `term_value_id` or `without_term_value_id` parameters */
        term_id_or_unknown?: number[];
        /** Include observations with an annotation created by this user */
        annotation_user_id?: string[];
        /** Include observations with a positional accuracy above this value (meters) */
        acc_above?: number;
        /** Include observations with a positional accuracy below this value (meters) */
        acc_below?: number;
        /** Include observations with a positional accuracy below this value (in meters) or with an unknown positional accuracy */
        acc_below_or_unknown?: number;
        /** Include observations observed on or after this date/time */
        d1?: string;
        /** Include observations observed on or before this date/time */
        d2?: string;
        /** Include observations created on or after this date/time */
        created_d1?: string;
        /** Include observations created on or before this date/time */
        created_d2?: string;
        /** Include observations created on this date */
        created_on?: string;
        /** Include observations observed on this date */
        observed_on?: string;
        /** Exclude observations of taxa previously observed by this user */
        unobserved_by_user_id?: string;
        /** Include observations that match the rules of the project with this ID or slug */
        apply_project_rules_for?: string;
        /** Include observations included in this observation accuracy experiment */
        observation_accuracy_experiment_id?: number[];
        /** Include observations of taxa that have this conservation status code. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
        cs?: string;
        /** Include observations of taxa that have a conservation status from this authority. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
        csa?: string;
        /** Include observations of taxa that have this IUCN conservation status. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
        csi?: ("LC" | "NT" | "VU" | "EN" | "CR" | "EW" | "EX")[];
        /** Include observations with this geoprivacy setting */
        geoprivacy?: ("obscured" | "obscured_private" | "open" | "private")[];
        /** Include observations where this is the most conservative geoprivacy applied by a conservation status associated with one of the taxa proposed in the current identifications */
        taxon_geoprivacy?: (
          | "obscured"
          | "obscured_private"
          | "open"
          | "private"
        )[];
        /** Include observations where `geoprivacy` or `taxon_geoprivacy` match these values */
        obscuration?: ("obscured" | "private" | "none")[];
        /** Include observations of taxa with this rank or lower */
        hrank?: (
          | "stateofmatter"
          | "kingdom"
          | "phylum"
          | "subphylum"
          | "superclass"
          | "class"
          | "subclass"
          | "infraclass"
          | "subterclass"
          | "superorder"
          | "order"
          | "suborder"
          | "infraorder"
          | "parvorder"
          | "zoosection"
          | "zoosubsection"
          | "superfamily"
          | "epifamily"
          | "family"
          | "subfamily"
          | "supertribe"
          | "tribe"
          | "subtribe"
          | "genus"
          | "genushybrid"
          | "subgenus"
          | "section"
          | "subsection"
          | "complex"
          | "species"
          | "hybrid"
          | "subspecies"
          | "variety"
          | "form"
          | "infrahybrid"
        )[];
        /** Include observations of taxa with this rank or higher */
        lrank?: (
          | "stateofmatter"
          | "kingdom"
          | "phylum"
          | "subphylum"
          | "superclass"
          | "class"
          | "subclass"
          | "infraclass"
          | "subterclass"
          | "superorder"
          | "order"
          | "suborder"
          | "infraorder"
          | "parvorder"
          | "zoosection"
          | "zoosubsection"
          | "superfamily"
          | "epifamily"
          | "family"
          | "subfamily"
          | "supertribe"
          | "tribe"
          | "subtribe"
          | "genus"
          | "genushybrid"
          | "subgenus"
          | "section"
          | "subsection"
          | "complex"
          | "species"
          | "hybrid"
          | "subspecies"
          | "variety"
          | "form"
          | "infrahybrid"
        )[];
        /** Include observations of taxa within this iconic taxon */
        iconic_taxa?: (
          | "Actinopterygii"
          | "Animalia"
          | "Amphibia"
          | "Arachnida"
          | "Aves"
          | "Chromista"
          | "Fungi"
          | "Insecta"
          | "Mammalia"
          | "Mollusca"
          | "Reptilia"
          | "Plantae"
          | "Protozoa"
          | "unknown"
        )[];
        /** Include observations with an ID above this value */
        id_above?: number;
        /** Include observations with an ID below this value */
        id_below?: number;
        /**
         * Include observations based on level of agreement among identifications:
         *
         * * **most_agree:** includes observations where there are more active identifications of taxa that agree with the Observation Taxon than active identifications that disagree with the Observation Taxon
         * * **some_agree:** includes observations where there are some active identifications of taxa that agree with the Observation Taxon
         * * **most_disagree:** includes observations where there are more active identifications of taxa that disagree with the Observation Taxon than active identifications that agree with the Observation Taxon
         */
        identifications?: "most_agree" | "most_disagree" | "some_agree";
        /** Include observations where there is disagreement among active identifications */
        disagreements?: "true" | "false";
        /**
         * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
         * @format float
         * @min -90
         * @max 90
         */
        lat?: number;
        /**
         * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
         * @format float
         * @min -180
         * @max 180
         */
        lng?: number;
        /**
         * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
         * @format float
         */
        radius?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -90
         * @max 90
         */
        nelat?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -180
         * @max 180
         */
        nelng?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -90
         * @max 90
         */
        swlat?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -180
         * @max 180
         */
        swlng?: number;
        /** Include observations of taxa in a list with this ID */
        list_id?: number;
        /** Exclude observations added to the project this ID or slug */
        not_in_project?: string[];
        /** Exclude observations that match the rules of the project with this ID or slug */
        not_matching_project_rules_for?: string;
        /** Include observations with a description, tags, or place_guess matching this query. Can be combined with `search_on` */
        q?: string;
        /** Include observations where any of these properties match the value of the `q` parameter */
        search_on?:
          | "names"
          | "tags"
          | "description"
          | "place"
          | "taxon_page_obs_photos";
        /** Include observations with this quality grade */
        quality_grade?: ("casual" | "needs_id" | "research")[];
        /** Exclude observations that are casual for any reason other than being marked captive */
        not_casual_excluding_captive?: "true" | "false";
        /** Exclude observations with this observation field */
        without_field?: string;
        /** Include observations with outlinks from this source */
        outlink_source?: string;
        /** Include observations updated since this time */
        updated_since?: string;
        /** Must be combined with the `reviewed` parameter */
        viewer_id?: number;
        /** Filter by observations reviewed by the user with ID matching the value of the `viewer_id` parameter */
        reviewed?: "true" | "false";
        /** Filter by observations expected to occur nearby their location according to the latest iNaturalist Geomodel */
        expected_nearby?: "true" | "false";
        /** Filter by observations voted as not accurately depicting an organism or scene */
        fails_dqa_accurate?: "true" | "false";
        /** Filter by observations voted as not having an accurate date */
        fails_dqa_date?: "true" | "false";
        /** Filter by observations voted as not evidence of an organism */
        fails_dqa_evidence?: "true" | "false";
        /** Filter by observations voted as not having an accurate location */
        fails_dqa_location?: "true" | "false";
        /** Filter by observations voted as the community ID cannot be improved */
        fails_dqa_needs_id?: "true" | "false";
        /** Filter by observations voted as not recent evidence of an organism */
        fails_dqa_recent?: "true" | "false";
        /** Filter by observations voted as not having evidence related to a single subject */
        fails_dqa_subject?: "true" | "false";
        /** Filter by observations voted as not wild */
        fails_dqa_wild?: "true" | "false";
        /** Include observations created by users created after a date. Accepts dates with or without times, e.g. 2025-01-01, as well as relative day, month, or year, e.g. 10d, 2w, 1y */
        user_after?: string;
        /** Include observations created by users created before a date. Accepts dates with or without times, e.g. 2025-01-01, as well as relative day, month, or year, e.g. 10d, 2w, 1y */
        user_before?: string;
        /** Returned taxon common names will be from this locale */
        locale?: string;
        /** Returned taxon common names will prioritize common names from this place */
        preferred_place_id?: number;
        /** Set the `Cache-Control` HTTP header with this value as `max-age`, in seconds. This means subsequent identical requests may be cached on  iNaturalist servers, and commonly within web browsers */
        ttl?: number;
        /**
         * Pagination `page` number
         * @min 0
         */
        page?: number;
        /** Number of results to return in a `page` */
        per_page?: number;
        /**
         * Sort order
         * @default "desc"
         */
        order?: "desc" | "asc";
        /**
         * Attribute to sort on
         * @default "created_at"
         */
        order_by?:
          | "created_at"
          | "geo_score"
          | "id"
          | "observed_on"
          | "random"
          | "species_guess"
          | "updated_at"
          | "votes";
        /** Include observations with this ID */
        only_id?: "true" | "false";
        /**
         * Attribute fields to return in the response
         * @example "species_guess,observed_on"
         */
        fields?: any;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultsObservations, Error>({
        path: `/observations`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Observations
     * @name ObservationsCreate
     * @summary Create observations.
     * @request POST:/observations
     * @secure
     */
    observationsCreate: (
      data: ObservationsCreate,
      params: RequestParams = {},
    ) =>
      this.request<ResultsObservations, Error>({
        path: `/observations`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Observations
     * @name ViewedUpdatesUpdate
     * @summary Mark all updates associated with this observation as viewed by logged-in user
     * @request PUT:/observations/{uuid}/viewed_updates
     * @secure
     */
    viewedUpdatesUpdate: (uuid: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/observations/${uuid}/viewed_updates`,
        method: "PUT",
        secure: true,
        ...params,
      }),

    /**
     * @description Shows additional information about an observation's taxon given the observation's coordinates, including relevant a conservation status and establishment means
     *
     * @tags Observations
     * @name TaxonSummaryList
     * @summary Additional information about an observation's taxon
     * @request GET:/observations/{uuid}/taxon_summary
     * @secure
     */
    taxonSummaryList: (
      uuid: string,
      query?: {
        /** Show info about the community taxon instead of the observation taxon */
        community?: "true" | "false";
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultsTaxonSummary, any>({
        path: `/observations/${uuid}/taxon_summary`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Includes subscriptions to this specific observation and to the user who made this observation. Generally only useful to detect whether the authenticated user is subscribed to these records.
     *
     * @tags Observations
     * @name SubscriptionsList
     * @summary List the authenticated user's subscriptions to this observation
     * @request GET:/observations/{uuid}/subscriptions
     * @secure
     */
    subscriptionsList: (
      uuid: string,
      query?: {
        fields?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultsSubscriptions, any>({
        path: `/observations/${uuid}/subscriptions`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Observations
     * @name SubscriptionUpdate
     * @summary Toggle the authenticated user's subscription to an observation
     * @request PUT:/observations/{uuid}/subscription
     * @secure
     */
    subscriptionUpdate: (uuid: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/observations/${uuid}/subscription`,
        method: "PUT",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Observations
     * @name ReviewCreate
     * @summary Review an observation
     * @request POST:/observations/{uuid}/review
     * @secure
     */
    reviewCreate: (uuid: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/observations/${uuid}/review`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Observations
     * @name ReviewDelete
     * @summary Remove a review from an observation
     * @request DELETE:/observations/{uuid}/review
     * @secure
     */
    reviewDelete: (uuid: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/observations/${uuid}/review`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Observations
     * @name QualityCreate
     * @summary Vote on an observation quality metric
     * @request POST:/observations/{uuid}/quality/{metric}
     * @secure
     */
    qualityCreate: (
      uuid: string[],
      metric:
        | "date"
        | "evidence"
        | "location"
        | "needs_id"
        | "recent"
        | "wild"
        | "subject"
        | "accurate",
      query?: {
        agree?: "true" | "false";
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/observations/${uuid}/quality/${metric}`,
        method: "POST",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Observations
     * @name QualityDelete
     * @summary Remove the authenticated user's vote on a quality metric
     * @request DELETE:/observations/{uuid}/quality/{metric}
     * @secure
     */
    qualityDelete: (
      uuid: string[],
      metric:
        | "date"
        | "evidence"
        | "location"
        | "needs_id"
        | "recent"
        | "wild"
        | "subject"
        | "accurate",
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/observations/${uuid}/quality/${metric}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Observations
     * @name QualityMetricsList
     * @summary Fetch quality metrics for observations
     * @request GET:/observations/{uuid}/quality_metrics
     * @secure
     */
    qualityMetricsList: (
      uuid: string[],
      query?: {
        fields?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultsQualityMetrics, any>({
        path: `/observations/${uuid}/quality_metrics`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Observations
     * @name FaveCreate
     * @summary Fave an observation
     * @request POST:/observations/{uuid}/fave
     * @secure
     */
    faveCreate: (uuid: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/observations/${uuid}/fave`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Observations
     * @name FaveDelete
     * @summary Remove a fave on an observation
     * @request DELETE:/observations/{uuid}/fave
     * @secure
     */
    faveDelete: (uuid: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/observations/${uuid}/fave`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Observations
     * @name ObservationsDetail
     * @summary Fetch observations
     * @request GET:/observations/{uuid}
     * @secure
     */
    observationsDetail: (
      uuid: string[],
      query?: {
        fields?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultsObservations, Error>({
        path: `/observations/${uuid}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Observations
     * @name ObservationsUpdate
     * @summary Update an observation.
     * @request PUT:/observations/{uuid}
     * @secure
     */
    observationsUpdate: (
      uuid: string,
      data: ObservationsUpdate,
      params: RequestParams = {},
    ) =>
      this.request<ResultsObservations, any>({
        path: `/observations/${uuid}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Observations
     * @name ObservationsDelete
     * @summary Delete an observation
     * @request DELETE:/observations/{uuid}
     * @secure
     */
    observationsDelete: (uuid: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/observations/${uuid}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  observationSounds = {
    /**
     * No description
     *
     * @tags ObservationSounds
     * @name ObservationSoundsCreate
     * @summary Create observation sounds
     * @request POST:/observation_sounds
     * @secure
     */
    observationSoundsCreate: (
      data: ObservationSoundsCreateMultipart,
      params: RequestParams = {},
    ) =>
      this.request<ResultsObservationSounds, any>({
        path: `/observation_sounds`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ObservationSounds
     * @name ObservationSoundsUpdate
     * @summary Update an observation sound
     * @request PUT:/observation_sounds/{uuid}
     * @secure
     */
    observationSoundsUpdate: (
      uuid: string,
      data: ObservationSoundsUpdate,
      params: RequestParams = {},
    ) =>
      this.request<ResultsObservationSounds, any>({
        path: `/observation_sounds/${uuid}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ObservationSounds
     * @name ObservationSoundsDelete
     * @summary Delete an observation sound
     * @request DELETE:/observation_sounds/{uuid}
     * @secure
     */
    observationSoundsDelete: (uuid: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/observation_sounds/${uuid}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  observationPhotos = {
    /**
     * @description Use `multipart/form-data` to upload a new photo to an existing observation and `application/json` to create a connetion between an existing observation and an existing photo. Both accept a client-specified UUID and have upsert behavior to prevent creating duplicate ObservationPhoto records if requests succeed but fail to receive a response under poor network conditions.
     *
     * @tags ObservationPhotos
     * @name ObservationPhotosCreate
     * @summary Create observation photos
     * @request POST:/observation_photos
     * @secure
     */
    observationPhotosCreate: (
      data: ObservationPhotosCreateMultipart,
      params: RequestParams = {},
    ) =>
      this.request<ResultsObservationPhotos, any>({
        path: `/observation_photos`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ObservationPhotos
     * @name ObservationPhotosUpdate
     * @summary Update an observation photo
     * @request PUT:/observation_photos/{uuid}
     * @secure
     */
    observationPhotosUpdate: (
      uuid: string,
      data: ObservationPhotosUpdate,
      params: RequestParams = {},
    ) =>
      this.request<ResultsObservationPhotos, any>({
        path: `/observation_photos/${uuid}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ObservationPhotos
     * @name ObservationPhotosDelete
     * @summary Delete an observation photo
     * @request DELETE:/observation_photos/{uuid}
     * @secure
     */
    observationPhotosDelete: (uuid: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/observation_photos/${uuid}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  observationFieldValues = {
    /**
     * No description
     *
     * @tags ObservationFieldValues
     * @name ObservationFieldValuesCreate
     * @summary Create observation field values
     * @request POST:/observation_field_values
     * @secure
     */
    observationFieldValuesCreate: (
      data: ObservationFieldValuesCreate,
      params: RequestParams = {},
    ) =>
      this.request<ResultsObservationFieldValues, any>({
        path: `/observation_field_values`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ObservationFieldValues
     * @name ObservationFieldValuesUpdate
     * @summary Update an observation field value
     * @request PUT:/observation_field_values/{uuid}
     * @secure
     */
    observationFieldValuesUpdate: (
      uuid: string,
      data: ObservationFieldValuesCreate,
      params: RequestParams = {},
    ) =>
      this.request<ResultsObservationFieldValues, any>({
        path: `/observation_field_values/${uuid}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ObservationFieldValues
     * @name ObservationFieldValuesDelete
     * @summary Delete an observation field value
     * @request DELETE:/observation_field_values/{uuid}
     * @secure
     */
    observationFieldValuesDelete: (uuid: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/observation_field_values/${uuid}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  messages = {
    /**
     * No description
     *
     * @tags Messages
     * @name MessagesList
     * @summary Retrieve messages for the authenticated user
     * @request GET:/messages
     * @secure
     */
    messagesList: (
      query?: {
        page?: number;
        fields?: any;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultsMessages, Error>({
        path: `/messages`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Messages
     * @name MessagesCreate
     * @summary Create a message
     * @request POST:/messages
     * @secure
     */
    messagesCreate: (data: MessagesCreate, params: RequestParams = {}) =>
      this.request<ResultsMessages, Error>({
        path: `/messages`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Messages
     * @name MessagesDetail
     * @summary Retrieve messages in a thread
     * @request GET:/messages/{id}
     * @secure
     */
    messagesDetail: (
      id: number,
      query?: {
        fields?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultsMessagesThread, Error>({
        path: `/messages/${id}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  identifications = {
    /**
     * No description
     *
     * @tags Identifications
     * @name SimilarSpeciesList
     * @summary Similar Species
     * @request GET:/identifications/similar_species
     */
    similarSpeciesList: (
      query: {
        page?: number;
        per_page?: number;
        fields?: string;
        taxon_id: number;
        /** Observation must have this quality grade */
        quality_grade?: ("research" | "needs_id" | "casual")[];
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultsTaxaCounts, Error>({
        path: `/identifications/similar_species`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Identifications
     * @name RecentTaxaList
     * @summary Fetch recent identifications and their associated taxa
     * @request GET:/identifications/recent_taxa
     */
    recentTaxaList: (
      query: {
        page?: number;
        per_page?: number;
        fields?: string;
        verifiable?: "true" | "false";
        /** ID taxa must match the given taxa or their descendants */
        taxon_id: number[];
        /** Observation must have this quality grade */
        quality_grade?: ("research" | "needs_id" | "casual")[];
        rank?: string;
        category?: string[];
        locale?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultsIdentificationsRecentTaxa, any>({
        path: `/identifications/recent_taxa`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Identifications
     * @name IdentifiersList
     * @summary Fetch people who have added the most identifications
     * @request GET:/identifications/identifiers
     */
    identifiersList: (
      query?: {
        page?: number;
        per_page?: number;
        fields?: string;
        /** ID taxa must match the given taxa or their descendants */
        taxon_id?: string[];
        /** Observation must have this quality grade */
        quality_grade?: ("research" | "needs_id" | "casual")[];
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultsIdentifiers, any>({
        path: `/identifications/identifiers`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Identifications
     * @name IdentificationsCreate
     * @summary Create an identification
     * @request POST:/identifications
     * @secure
     */
    identificationsCreate: (
      data: IdentificationsCreate,
      params: RequestParams = {},
    ) =>
      this.request<ResultsIdentifications, any>({
        path: `/identifications`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Identifications
     * @name IdentificationsUpdate
     * @summary Update an identification
     * @request PUT:/identifications/{uuid}
     * @secure
     */
    identificationsUpdate: (
      uuid: string,
      data: IdentificationsUpdate,
      params: RequestParams = {},
    ) =>
      this.request<ResultsObservations, any>({
        path: `/identifications/${uuid}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Note that unlike API v1, this completely deletes the identification. To withdraw the identification, update `current` to `false`.
     *
     * @tags Identifications
     * @name IdentificationsDelete
     * @summary Delete an identification
     * @request DELETE:/identifications/{uuid}
     * @secure
     */
    identificationsDelete: (uuid: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/identifications/${uuid}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  flags = {
    /**
     * No description
     *
     * @tags Flags
     * @name FlagsCreate
     * @summary Create a flag
     * @request POST:/flags
     * @secure
     */
    flagsCreate: (data: FlagsCreate, params: RequestParams = {}) =>
      this.request<ResultsFlags, Error>({
        path: `/flags`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Flags
     * @name FlagsUpdate
     * @summary Update a flag
     * @request PUT:/flags/{id}
     * @secure
     */
    flagsUpdate: (id: number, data: FlagsUpdate, params: RequestParams = {}) =>
      this.request<ResultsFlags, Error>({
        path: `/flags/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Flags
     * @name FlagsDelete
     * @summary Delete a flag
     * @request DELETE:/flags/{id}
     * @secure
     */
    flagsDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, Error>({
        path: `/flags/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  controlledTerms = {
    /**
     * No description
     *
     * @tags Controlled Terms
     * @name ControlledTermsList
     * @summary Search controlled terms
     * @request GET:/controlled_terms
     * @secure
     */
    controlledTermsList: (
      query?: {
        fields?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultsControlledTerms, any>({
        path: `/controlled_terms`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Controlled Terms
     * @name ForTaxonDetail
     * @summary Fetch controlled terms for a taxon
     * @request GET:/controlled_terms/for_taxon/{taxon_id}
     * @secure
     */
    forTaxonDetail: (
      taxonId: string[],
      query?: {
        fields?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultsControlledTerms, any>({
        path: `/controlled_terms/for_taxon/${taxonId}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  comments = {
    /**
     * No description
     *
     * @tags Comments
     * @name CommentsCreate
     * @summary Create a comment
     * @request POST:/comments
     * @secure
     */
    commentsCreate: (data: CommentsCreate, params: RequestParams = {}) =>
      this.request<ResultsComments, any>({
        path: `/comments`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Comments
     * @name CommentsUpdate
     * @summary Update a comment
     * @request PUT:/comments/{uuid}
     * @secure
     */
    commentsUpdate: (
      uuid: string,
      data: CommentsUpdate,
      params: RequestParams = {},
    ) =>
      this.request<ResultsComments, any>({
        path: `/comments/${uuid}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Comments
     * @name CommentsDelete
     * @summary Delete a comment
     * @request DELETE:/comments/{uuid}
     * @secure
     */
    commentsDelete: (uuid: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/comments/${uuid}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  authorizedApplications = {
    /**
     * No description
     *
     * @tags AuthorizedApplications
     * @name AuthorizedApplicationsList
     * @summary Applications the authenticated user has authorized to access their iNat account
     * @request GET:/authorized_applications
     * @secure
     */
    authorizedApplicationsList: (
      query?: {
        fields?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultsAuthorizedApplications, Error>({
        path: `/authorized_applications`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags AuthorizedApplications
     * @name AuthorizedApplicationsDelete
     * @summary Revoke application authorization
     * @request DELETE:/authorized_applications/{id}
     * @secure
     */
    authorizedApplicationsDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, Error>({
        path: `/authorized_applications/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  announcements = {
    /**
     * No description
     *
     * @tags Announcements
     * @name AnnouncementsList
     * @summary Search announcements
     * @request GET:/announcements
     * @secure
     */
    announcementsList: (
      query?: {
        placement?:
          | "users/dashboard#sidebar"
          | "users/dashboard"
          | "welcome/index"
          | "mobile/home"
          | "mobile";
        client?: "inat-ios" | "inat-android" | "seek" | "inatrn";
        locale?: string;
        fields?: any;
      },
      params: RequestParams = {},
    ) =>
      this.request<ResultsAnnouncements, any>({
        path: `/announcements`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Announcements
     * @name DismissUpdate
     * @summary Dismiss an announcement
     * @request PUT:/announcements/{id}/dismiss
     * @secure
     */
    dismissUpdate: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/announcements/${id}/dismiss`,
        method: "PUT",
        secure: true,
        ...params,
      }),
  };
  annotations = {
    /**
     * No description
     *
     * @tags Annotations
     * @name AnnotationsCreate
     * @summary Create an annotation
     * @request POST:/annotations
     * @secure
     */
    annotationsCreate: (data: AnnotationsCreate, params: RequestParams = {}) =>
      this.request<ResultsAnnotations, any>({
        path: `/annotations`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Annotations
     * @name VoteCreate
     * @summary Vote on an annotation
     * @request POST:/annotations/{uuid}/vote
     * @secure
     */
    voteCreate: (uuid: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/annotations/${uuid}/vote`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Annotations
     * @name VoteDelete
     * @summary Remove the authenticated user's vote on an annotation
     * @request DELETE:/annotations/{uuid}/vote
     * @secure
     */
    voteDelete: (uuid: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/annotations/${uuid}/vote`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Annotations
     * @name AnnotationsDelete
     * @summary Delete an annotation
     * @request DELETE:/annotations/{uuid}
     * @secure
     */
    annotationsDelete: (uuid: string[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/annotations/${uuid}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  taxonRanges = {
    /**
     * No description
     *
     * @tags Polygon Tiles
     * @name PngList
     * @summary Taxon Range Tiles
     * @request GET:/taxon_ranges/{id}/{zoom}/{x}/{y}.png
     * @secure
     */
    pngList: (
      id: string,
      zoom: number,
      x: number,
      y: number,
      query?: {
        tile_size?: 256 | 512;
        /** Filter by whether `positional_accuracy` is set or not */
        acc?: "true" | "false";
        /** Filter by captive / cultivated status */
        captive?: "true" | "false";
        /** Filter by whether the observation is in a place with a check list entry indicating the establishment means is `endemic` */
        endemic?: "true" | "false";
        /** Filter by observations that are georeferenced */
        geo?: "true" | "false";
        /** @deprecated */
        id_please?: "true" | "false";
        /** Filter by observations that have community identifications */
        identified?: "true" | "false";
        /** Filter by observations of taxa that are introduced in their location */
        introduced?: "true" | "false";
        /** Filter by observations that show on map tiles */
        mappable?: "true" | "false";
        /** Filter by observations of taxa that are native to their location */
        native?: "true" | "false";
        /** Filter by observations of taxa that outside their known ranges */
        out_of_range?: "true" | "false";
        /** @deprecated */
        pcid?: "true" | "false";
        /** Filter by observations with photos */
        photos?: "true" | "false";
        /** Filter by observations that have been favorited by at least one user */
        popular?: "true" | "false";
        /** Filter by observations with sounds */
        sounds?: "true" | "false";
        /** Filter by observations of active taxa */
        taxon_is_active?: "true" | "false";
        /** Filter by whether the observed taxon has a conservation status of "threatened" or worse */
        threatened?: "true" | "false";
        /** Filter by whether observations are 'verifiable' (i.e. have quality grades `research` or `needs_id`) */
        verifiable?: "true" | "false";
        /** Exclude observations with this ID */
        not_id?: string[];
        /** Include observations with this license */
        license?: (
          | "cc-by"
          | "cc-by-nc"
          | "cc-by-nd"
          | "cc-by-sa"
          | "cc-by-nc-nd"
          | "cc-by-nc-sa"
          | "cc0"
        )[];
        /** Include observations with least one photo with this license */
        photo_license?: (
          | "cc-by"
          | "cc-by-nc"
          | "cc-by-nd"
          | "cc-by-sa"
          | "cc-by-nc-nd"
          | "cc-by-nc-sa"
          | "cc0"
        )[];
        /** Include observations where the license attribute is not null, i.e. it is licensed */
        licensed?: "true" | "false";
        /** Include observations with at least one photo with a license attribute that is not null */
        photo_licensed?: "true" | "false";
        /** Include observations observed within the place with this ID */
        place_id?: (string | number)[];
        /** Include observations added to the project with this ID or slug */
        project_id?: (number | string)[];
        /** Filter by observers who trust the project(s) specified in `project_id` OR trust the authenticated viewer */
        coords_viewable_for_proj?: "true" | "false";
        /** Include observations of taxa with this rank */
        rank?: (
          | "stateofmatter"
          | "kingdom"
          | "phylum"
          | "subphylum"
          | "superclass"
          | "class"
          | "subclass"
          | "infraclass"
          | "subterclass"
          | "superorder"
          | "order"
          | "suborder"
          | "infraorder"
          | "parvorder"
          | "zoosection"
          | "zoosubsection"
          | "superfamily"
          | "epifamily"
          | "family"
          | "subfamily"
          | "supertribe"
          | "tribe"
          | "subtribe"
          | "genus"
          | "genushybrid"
          | "subgenus"
          | "section"
          | "subsection"
          | "complex"
          | "species"
          | "hybrid"
          | "subspecies"
          | "variety"
          | "form"
          | "infrahybrid"
        )[];
        /** Include observations affiliated with the iNaturalist network website with this ID */
        site_id?: number[];
        /** Include observations that have at least one sound with this license */
        sound_license?: (
          | "cc-by"
          | "cc-by-nc"
          | "cc-by-nd"
          | "cc-by-sa"
          | "cc-by-nc-nd"
          | "cc-by-nc-sa"
          | "cc0"
        )[];
        /** Include observations of this taxon and its descendants */
        taxon_id?: number[];
        /** Exclude observations of this taxon and its descendants */
        without_taxon_id?: number[];
        /** Include observations of taxa that have a scientific or common name matching this string */
        taxon_name?: string;
        /** Include observations observed by users that have this ID or login */
        user_id?: string[];
        /** Include observations observed by users that have this login */
        user_login?: string[];
        /** Include observations observed within this hour of the day */
        hour?: number[];
        /** Include observations observed within this day of the month */
        day?: number[];
        /** Include observations observed within this month */
        month?: number[];
        /** Include observations observed within this year */
        year?: number[];
        /** Include observations created within this day of the month */
        created_day?: number[];
        /** Include observations created within this month */
        created_month?: number[];
        /** Include observations created within this year */
        created_year?: number[];
        /** Include observations with annotations using this controlled term ID */
        term_id?: number[];
        /** Include observations with annotations using this controlled value ID. Must be combined with the `term_id` parameter */
        term_value_id?: number[];
        /** Exclude observations with annotations using this controlled value ID. Must be combined with the `term_id` parameter */
        without_term_value_id?: number[];
        /** Include observations with annotations using this controlled term ID and associated term value IDs, or be missing annotations using this controlled term ID. Must be combined with the `term_value_id` or `without_term_value_id` parameters */
        term_id_or_unknown?: number[];
        /** Include observations with an annotation created by this user */
        annotation_user_id?: string[];
        /** Include observations with a positional accuracy above this value (meters) */
        acc_above?: number;
        /** Include observations with a positional accuracy below this value (meters) */
        acc_below?: number;
        /** Include observations with a positional accuracy below this value (in meters) or with an unknown positional accuracy */
        acc_below_or_unknown?: number;
        /** Include observations observed on or after this date/time */
        d1?: string;
        /** Include observations observed on or before this date/time */
        d2?: string;
        /** Include observations created on or after this date/time */
        created_d1?: string;
        /** Include observations created on or before this date/time */
        created_d2?: string;
        /** Include observations created on this date */
        created_on?: string;
        /** Include observations observed on this date */
        observed_on?: string;
        /** Exclude observations of taxa previously observed by this user */
        unobserved_by_user_id?: string;
        /** Include observations that match the rules of the project with this ID or slug */
        apply_project_rules_for?: string;
        /** Include observations included in this observation accuracy experiment */
        observation_accuracy_experiment_id?: number[];
        /** Include observations of taxa that have this conservation status code. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
        cs?: string;
        /** Include observations of taxa that have a conservation status from this authority. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
        csa?: string;
        /** Include observations of taxa that have this IUCN conservation status. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
        csi?: ("LC" | "NT" | "VU" | "EN" | "CR" | "EW" | "EX")[];
        /** Include observations with this geoprivacy setting */
        geoprivacy?: ("obscured" | "obscured_private" | "open" | "private")[];
        /** Include observations where this is the most conservative geoprivacy applied by a conservation status associated with one of the taxa proposed in the current identifications */
        taxon_geoprivacy?: (
          | "obscured"
          | "obscured_private"
          | "open"
          | "private"
        )[];
        /** Include observations where `geoprivacy` or `taxon_geoprivacy` match these values */
        obscuration?: ("obscured" | "private" | "none")[];
        /** Include observations of taxa with this rank or lower */
        hrank?: (
          | "stateofmatter"
          | "kingdom"
          | "phylum"
          | "subphylum"
          | "superclass"
          | "class"
          | "subclass"
          | "infraclass"
          | "subterclass"
          | "superorder"
          | "order"
          | "suborder"
          | "infraorder"
          | "parvorder"
          | "zoosection"
          | "zoosubsection"
          | "superfamily"
          | "epifamily"
          | "family"
          | "subfamily"
          | "supertribe"
          | "tribe"
          | "subtribe"
          | "genus"
          | "genushybrid"
          | "subgenus"
          | "section"
          | "subsection"
          | "complex"
          | "species"
          | "hybrid"
          | "subspecies"
          | "variety"
          | "form"
          | "infrahybrid"
        )[];
        /** Include observations of taxa with this rank or higher */
        lrank?: (
          | "stateofmatter"
          | "kingdom"
          | "phylum"
          | "subphylum"
          | "superclass"
          | "class"
          | "subclass"
          | "infraclass"
          | "subterclass"
          | "superorder"
          | "order"
          | "suborder"
          | "infraorder"
          | "parvorder"
          | "zoosection"
          | "zoosubsection"
          | "superfamily"
          | "epifamily"
          | "family"
          | "subfamily"
          | "supertribe"
          | "tribe"
          | "subtribe"
          | "genus"
          | "genushybrid"
          | "subgenus"
          | "section"
          | "subsection"
          | "complex"
          | "species"
          | "hybrid"
          | "subspecies"
          | "variety"
          | "form"
          | "infrahybrid"
        )[];
        /** Include observations of taxa within this iconic taxon */
        iconic_taxa?: (
          | "Actinopterygii"
          | "Animalia"
          | "Amphibia"
          | "Arachnida"
          | "Aves"
          | "Chromista"
          | "Fungi"
          | "Insecta"
          | "Mammalia"
          | "Mollusca"
          | "Reptilia"
          | "Plantae"
          | "Protozoa"
          | "unknown"
        )[];
        /** Include observations with an ID above this value */
        id_above?: number;
        /** Include observations with an ID below this value */
        id_below?: number;
        /**
         * Include observations based on level of agreement among identifications:
         *
         * * **most_agree:** includes observations where there are more active identifications of taxa that agree with the Observation Taxon than active identifications that disagree with the Observation Taxon
         * * **some_agree:** includes observations where there are some active identifications of taxa that agree with the Observation Taxon
         * * **most_disagree:** includes observations where there are more active identifications of taxa that disagree with the Observation Taxon than active identifications that agree with the Observation Taxon
         */
        identifications?: "most_agree" | "most_disagree" | "some_agree";
        /** Include observations where there is disagreement among active identifications */
        disagreements?: "true" | "false";
        /**
         * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
         * @format float
         * @min -90
         * @max 90
         */
        lat?: number;
        /**
         * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
         * @format float
         * @min -180
         * @max 180
         */
        lng?: number;
        /**
         * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
         * @format float
         */
        radius?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -90
         * @max 90
         */
        nelat?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -180
         * @max 180
         */
        nelng?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -90
         * @max 90
         */
        swlat?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -180
         * @max 180
         */
        swlng?: number;
        /** Include observations of taxa in a list with this ID */
        list_id?: number;
        /** Exclude observations added to the project this ID or slug */
        not_in_project?: string[];
        /** Exclude observations that match the rules of the project with this ID or slug */
        not_matching_project_rules_for?: string;
        /** Include observations with a description, tags, or place_guess matching this query. Can be combined with `search_on` */
        q?: string;
        /** Include observations where any of these properties match the value of the `q` parameter */
        search_on?:
          | "names"
          | "tags"
          | "description"
          | "place"
          | "taxon_page_obs_photos";
        /** Include observations with this quality grade */
        quality_grade?: ("casual" | "needs_id" | "research")[];
        /** Exclude observations that are casual for any reason other than being marked captive */
        not_casual_excluding_captive?: "true" | "false";
        /** Exclude observations with this observation field */
        without_field?: string;
        /** Include observations with outlinks from this source */
        outlink_source?: string;
        /** Include observations updated since this time */
        updated_since?: string;
        /** Must be combined with the `reviewed` parameter */
        viewer_id?: number;
        /** Filter by observations reviewed by the user with ID matching the value of the `viewer_id` parameter */
        reviewed?: "true" | "false";
        /** Filter by observations expected to occur nearby their location according to the latest iNaturalist Geomodel */
        expected_nearby?: "true" | "false";
        /** Filter by observations voted as not accurately depicting an organism or scene */
        fails_dqa_accurate?: "true" | "false";
        /** Filter by observations voted as not having an accurate date */
        fails_dqa_date?: "true" | "false";
        /** Filter by observations voted as not evidence of an organism */
        fails_dqa_evidence?: "true" | "false";
        /** Filter by observations voted as not having an accurate location */
        fails_dqa_location?: "true" | "false";
        /** Filter by observations voted as the community ID cannot be improved */
        fails_dqa_needs_id?: "true" | "false";
        /** Filter by observations voted as not recent evidence of an organism */
        fails_dqa_recent?: "true" | "false";
        /** Filter by observations voted as not having evidence related to a single subject */
        fails_dqa_subject?: "true" | "false";
        /** Filter by observations voted as not wild */
        fails_dqa_wild?: "true" | "false";
        /** Include observations created by users created after a date. Accepts dates with or without times, e.g. 2025-01-01, as well as relative day, month, or year, e.g. 10d, 2w, 1y */
        user_after?: string;
        /** Include observations created by users created before a date. Accepts dates with or without times, e.g. 2025-01-01, as well as relative day, month, or year, e.g. 10d, 2w, 1y */
        user_before?: string;
        /** Returned taxon common names will be from this locale */
        locale?: string;
        /** Returned taxon common names will prioritize common names from this place */
        preferred_place_id?: number;
        /** Set the `Cache-Control` HTTP header with this value as `max-age`, in seconds. This means subsequent identical requests may be cached on  iNaturalist servers, and commonly within web browsers */
        ttl?: number;
        /**
         * Pagination `page` number
         * @min 0
         */
        page?: number;
        /** Number of results to return in a `page` */
        per_page?: number;
        /**
         * Sort order
         * @default "desc"
         */
        order?: "desc" | "asc";
        /**
         * Attribute to sort on
         * @default "created_at"
         */
        order_by?:
          | "created_at"
          | "geo_score"
          | "id"
          | "observed_on"
          | "random"
          | "species_guess"
          | "updated_at"
          | "votes";
        /** Include observations with this ID */
        only_id?: "true" | "false";
      },
      params: RequestParams = {},
    ) =>
      this.request<Blob, any>({
        path: `/taxon_ranges/${id}/${zoom}/${x}/${y}.png`,
        method: "GET",
        query: query,
        secure: true,
        format: "blob",
        ...params,
      }),
  };
  taxonPlaces = {
    /**
     * No description
     *
     * @tags Polygon Tiles
     * @name PngList
     * @summary Taxon Place Tiles
     * @request GET:/taxon_places/{id}/{zoom}/{x}/{y}.png
     * @secure
     */
    pngList: (
      id: string,
      zoom: number,
      x: number,
      y: number,
      query?: {
        tile_size?: 256 | 512;
        /** Filter by whether `positional_accuracy` is set or not */
        acc?: "true" | "false";
        /** Filter by captive / cultivated status */
        captive?: "true" | "false";
        /** Filter by whether the observation is in a place with a check list entry indicating the establishment means is `endemic` */
        endemic?: "true" | "false";
        /** Filter by observations that are georeferenced */
        geo?: "true" | "false";
        /** @deprecated */
        id_please?: "true" | "false";
        /** Filter by observations that have community identifications */
        identified?: "true" | "false";
        /** Filter by observations of taxa that are introduced in their location */
        introduced?: "true" | "false";
        /** Filter by observations that show on map tiles */
        mappable?: "true" | "false";
        /** Filter by observations of taxa that are native to their location */
        native?: "true" | "false";
        /** Filter by observations of taxa that outside their known ranges */
        out_of_range?: "true" | "false";
        /** @deprecated */
        pcid?: "true" | "false";
        /** Filter by observations with photos */
        photos?: "true" | "false";
        /** Filter by observations that have been favorited by at least one user */
        popular?: "true" | "false";
        /** Filter by observations with sounds */
        sounds?: "true" | "false";
        /** Filter by observations of active taxa */
        taxon_is_active?: "true" | "false";
        /** Filter by whether the observed taxon has a conservation status of "threatened" or worse */
        threatened?: "true" | "false";
        /** Filter by whether observations are 'verifiable' (i.e. have quality grades `research` or `needs_id`) */
        verifiable?: "true" | "false";
        /** Exclude observations with this ID */
        not_id?: string[];
        /** Include observations with this license */
        license?: (
          | "cc-by"
          | "cc-by-nc"
          | "cc-by-nd"
          | "cc-by-sa"
          | "cc-by-nc-nd"
          | "cc-by-nc-sa"
          | "cc0"
        )[];
        /** Include observations with least one photo with this license */
        photo_license?: (
          | "cc-by"
          | "cc-by-nc"
          | "cc-by-nd"
          | "cc-by-sa"
          | "cc-by-nc-nd"
          | "cc-by-nc-sa"
          | "cc0"
        )[];
        /** Include observations where the license attribute is not null, i.e. it is licensed */
        licensed?: "true" | "false";
        /** Include observations with at least one photo with a license attribute that is not null */
        photo_licensed?: "true" | "false";
        /** Include observations observed within the place with this ID */
        place_id?: (string | number)[];
        /** Include observations added to the project with this ID or slug */
        project_id?: (number | string)[];
        /** Filter by observers who trust the project(s) specified in `project_id` OR trust the authenticated viewer */
        coords_viewable_for_proj?: "true" | "false";
        /** Include observations of taxa with this rank */
        rank?: (
          | "stateofmatter"
          | "kingdom"
          | "phylum"
          | "subphylum"
          | "superclass"
          | "class"
          | "subclass"
          | "infraclass"
          | "subterclass"
          | "superorder"
          | "order"
          | "suborder"
          | "infraorder"
          | "parvorder"
          | "zoosection"
          | "zoosubsection"
          | "superfamily"
          | "epifamily"
          | "family"
          | "subfamily"
          | "supertribe"
          | "tribe"
          | "subtribe"
          | "genus"
          | "genushybrid"
          | "subgenus"
          | "section"
          | "subsection"
          | "complex"
          | "species"
          | "hybrid"
          | "subspecies"
          | "variety"
          | "form"
          | "infrahybrid"
        )[];
        /** Include observations affiliated with the iNaturalist network website with this ID */
        site_id?: number[];
        /** Include observations that have at least one sound with this license */
        sound_license?: (
          | "cc-by"
          | "cc-by-nc"
          | "cc-by-nd"
          | "cc-by-sa"
          | "cc-by-nc-nd"
          | "cc-by-nc-sa"
          | "cc0"
        )[];
        /** Include observations of this taxon and its descendants */
        taxon_id?: number[];
        /** Exclude observations of this taxon and its descendants */
        without_taxon_id?: number[];
        /** Include observations of taxa that have a scientific or common name matching this string */
        taxon_name?: string;
        /** Include observations observed by users that have this ID or login */
        user_id?: string[];
        /** Include observations observed by users that have this login */
        user_login?: string[];
        /** Include observations observed within this hour of the day */
        hour?: number[];
        /** Include observations observed within this day of the month */
        day?: number[];
        /** Include observations observed within this month */
        month?: number[];
        /** Include observations observed within this year */
        year?: number[];
        /** Include observations created within this day of the month */
        created_day?: number[];
        /** Include observations created within this month */
        created_month?: number[];
        /** Include observations created within this year */
        created_year?: number[];
        /** Include observations with annotations using this controlled term ID */
        term_id?: number[];
        /** Include observations with annotations using this controlled value ID. Must be combined with the `term_id` parameter */
        term_value_id?: number[];
        /** Exclude observations with annotations using this controlled value ID. Must be combined with the `term_id` parameter */
        without_term_value_id?: number[];
        /** Include observations with annotations using this controlled term ID and associated term value IDs, or be missing annotations using this controlled term ID. Must be combined with the `term_value_id` or `without_term_value_id` parameters */
        term_id_or_unknown?: number[];
        /** Include observations with an annotation created by this user */
        annotation_user_id?: string[];
        /** Include observations with a positional accuracy above this value (meters) */
        acc_above?: number;
        /** Include observations with a positional accuracy below this value (meters) */
        acc_below?: number;
        /** Include observations with a positional accuracy below this value (in meters) or with an unknown positional accuracy */
        acc_below_or_unknown?: number;
        /** Include observations observed on or after this date/time */
        d1?: string;
        /** Include observations observed on or before this date/time */
        d2?: string;
        /** Include observations created on or after this date/time */
        created_d1?: string;
        /** Include observations created on or before this date/time */
        created_d2?: string;
        /** Include observations created on this date */
        created_on?: string;
        /** Include observations observed on this date */
        observed_on?: string;
        /** Exclude observations of taxa previously observed by this user */
        unobserved_by_user_id?: string;
        /** Include observations that match the rules of the project with this ID or slug */
        apply_project_rules_for?: string;
        /** Include observations included in this observation accuracy experiment */
        observation_accuracy_experiment_id?: number[];
        /** Include observations of taxa that have this conservation status code. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
        cs?: string;
        /** Include observations of taxa that have a conservation status from this authority. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
        csa?: string;
        /** Include observations of taxa that have this IUCN conservation status. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
        csi?: ("LC" | "NT" | "VU" | "EN" | "CR" | "EW" | "EX")[];
        /** Include observations with this geoprivacy setting */
        geoprivacy?: ("obscured" | "obscured_private" | "open" | "private")[];
        /** Include observations where this is the most conservative geoprivacy applied by a conservation status associated with one of the taxa proposed in the current identifications */
        taxon_geoprivacy?: (
          | "obscured"
          | "obscured_private"
          | "open"
          | "private"
        )[];
        /** Include observations where `geoprivacy` or `taxon_geoprivacy` match these values */
        obscuration?: ("obscured" | "private" | "none")[];
        /** Include observations of taxa with this rank or lower */
        hrank?: (
          | "stateofmatter"
          | "kingdom"
          | "phylum"
          | "subphylum"
          | "superclass"
          | "class"
          | "subclass"
          | "infraclass"
          | "subterclass"
          | "superorder"
          | "order"
          | "suborder"
          | "infraorder"
          | "parvorder"
          | "zoosection"
          | "zoosubsection"
          | "superfamily"
          | "epifamily"
          | "family"
          | "subfamily"
          | "supertribe"
          | "tribe"
          | "subtribe"
          | "genus"
          | "genushybrid"
          | "subgenus"
          | "section"
          | "subsection"
          | "complex"
          | "species"
          | "hybrid"
          | "subspecies"
          | "variety"
          | "form"
          | "infrahybrid"
        )[];
        /** Include observations of taxa with this rank or higher */
        lrank?: (
          | "stateofmatter"
          | "kingdom"
          | "phylum"
          | "subphylum"
          | "superclass"
          | "class"
          | "subclass"
          | "infraclass"
          | "subterclass"
          | "superorder"
          | "order"
          | "suborder"
          | "infraorder"
          | "parvorder"
          | "zoosection"
          | "zoosubsection"
          | "superfamily"
          | "epifamily"
          | "family"
          | "subfamily"
          | "supertribe"
          | "tribe"
          | "subtribe"
          | "genus"
          | "genushybrid"
          | "subgenus"
          | "section"
          | "subsection"
          | "complex"
          | "species"
          | "hybrid"
          | "subspecies"
          | "variety"
          | "form"
          | "infrahybrid"
        )[];
        /** Include observations of taxa within this iconic taxon */
        iconic_taxa?: (
          | "Actinopterygii"
          | "Animalia"
          | "Amphibia"
          | "Arachnida"
          | "Aves"
          | "Chromista"
          | "Fungi"
          | "Insecta"
          | "Mammalia"
          | "Mollusca"
          | "Reptilia"
          | "Plantae"
          | "Protozoa"
          | "unknown"
        )[];
        /** Include observations with an ID above this value */
        id_above?: number;
        /** Include observations with an ID below this value */
        id_below?: number;
        /**
         * Include observations based on level of agreement among identifications:
         *
         * * **most_agree:** includes observations where there are more active identifications of taxa that agree with the Observation Taxon than active identifications that disagree with the Observation Taxon
         * * **some_agree:** includes observations where there are some active identifications of taxa that agree with the Observation Taxon
         * * **most_disagree:** includes observations where there are more active identifications of taxa that disagree with the Observation Taxon than active identifications that agree with the Observation Taxon
         */
        identifications?: "most_agree" | "most_disagree" | "some_agree";
        /** Include observations where there is disagreement among active identifications */
        disagreements?: "true" | "false";
        /**
         * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
         * @format float
         * @min -90
         * @max 90
         */
        lat?: number;
        /**
         * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
         * @format float
         * @min -180
         * @max 180
         */
        lng?: number;
        /**
         * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
         * @format float
         */
        radius?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -90
         * @max 90
         */
        nelat?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -180
         * @max 180
         */
        nelng?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -90
         * @max 90
         */
        swlat?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -180
         * @max 180
         */
        swlng?: number;
        /** Include observations of taxa in a list with this ID */
        list_id?: number;
        /** Exclude observations added to the project this ID or slug */
        not_in_project?: string[];
        /** Exclude observations that match the rules of the project with this ID or slug */
        not_matching_project_rules_for?: string;
        /** Include observations with a description, tags, or place_guess matching this query. Can be combined with `search_on` */
        q?: string;
        /** Include observations where any of these properties match the value of the `q` parameter */
        search_on?:
          | "names"
          | "tags"
          | "description"
          | "place"
          | "taxon_page_obs_photos";
        /** Include observations with this quality grade */
        quality_grade?: ("casual" | "needs_id" | "research")[];
        /** Exclude observations that are casual for any reason other than being marked captive */
        not_casual_excluding_captive?: "true" | "false";
        /** Exclude observations with this observation field */
        without_field?: string;
        /** Include observations with outlinks from this source */
        outlink_source?: string;
        /** Include observations updated since this time */
        updated_since?: string;
        /** Must be combined with the `reviewed` parameter */
        viewer_id?: number;
        /** Filter by observations reviewed by the user with ID matching the value of the `viewer_id` parameter */
        reviewed?: "true" | "false";
        /** Filter by observations expected to occur nearby their location according to the latest iNaturalist Geomodel */
        expected_nearby?: "true" | "false";
        /** Filter by observations voted as not accurately depicting an organism or scene */
        fails_dqa_accurate?: "true" | "false";
        /** Filter by observations voted as not having an accurate date */
        fails_dqa_date?: "true" | "false";
        /** Filter by observations voted as not evidence of an organism */
        fails_dqa_evidence?: "true" | "false";
        /** Filter by observations voted as not having an accurate location */
        fails_dqa_location?: "true" | "false";
        /** Filter by observations voted as the community ID cannot be improved */
        fails_dqa_needs_id?: "true" | "false";
        /** Filter by observations voted as not recent evidence of an organism */
        fails_dqa_recent?: "true" | "false";
        /** Filter by observations voted as not having evidence related to a single subject */
        fails_dqa_subject?: "true" | "false";
        /** Filter by observations voted as not wild */
        fails_dqa_wild?: "true" | "false";
        /** Include observations created by users created after a date. Accepts dates with or without times, e.g. 2025-01-01, as well as relative day, month, or year, e.g. 10d, 2w, 1y */
        user_after?: string;
        /** Include observations created by users created before a date. Accepts dates with or without times, e.g. 2025-01-01, as well as relative day, month, or year, e.g. 10d, 2w, 1y */
        user_before?: string;
        /** Returned taxon common names will be from this locale */
        locale?: string;
        /** Returned taxon common names will prioritize common names from this place */
        preferred_place_id?: number;
        /** Set the `Cache-Control` HTTP header with this value as `max-age`, in seconds. This means subsequent identical requests may be cached on  iNaturalist servers, and commonly within web browsers */
        ttl?: number;
        /**
         * Pagination `page` number
         * @min 0
         */
        page?: number;
        /** Number of results to return in a `page` */
        per_page?: number;
        /**
         * Sort order
         * @default "desc"
         */
        order?: "desc" | "asc";
        /**
         * Attribute to sort on
         * @default "created_at"
         */
        order_by?:
          | "created_at"
          | "geo_score"
          | "id"
          | "observed_on"
          | "random"
          | "species_guess"
          | "updated_at"
          | "votes";
        /** Include observations with this ID */
        only_id?: "true" | "false";
      },
      params: RequestParams = {},
    ) =>
      this.request<Blob, any>({
        path: `/taxon_places/${id}/${zoom}/${x}/${y}.png`,
        method: "GET",
        query: query,
        secure: true,
        format: "blob",
        ...params,
      }),
  };
  projectUsers = {
    /**
     * No description
     *
     * @tags ProjectUsers
     * @name ProjectUsersUpdate
     * @summary Update project users.
     * @request PUT:/project_users/{id}
     * @secure
     */
    projectUsersUpdate: (
      id: string,
      data: ProjectUsersUpdate,
      params: RequestParams = {},
    ) =>
      this.request<ProjectUser, Error>({
        path: `/project_users/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  points = {
    /**
     * No description
     *
     * @tags Observation Tiles
     * @name PngList
     * @summary Points Tiles
     * @request GET:/points/{zoom}/{x}/{y}.png
     * @secure
     */
    pngList: (
      zoom: number,
      x: number,
      y: number,
      query?: {
        tile_size?: 256 | 512;
        /** Filter by whether `positional_accuracy` is set or not */
        acc?: "true" | "false";
        /** Filter by captive / cultivated status */
        captive?: "true" | "false";
        /** Filter by whether the observation is in a place with a check list entry indicating the establishment means is `endemic` */
        endemic?: "true" | "false";
        /** Filter by observations that are georeferenced */
        geo?: "true" | "false";
        /** @deprecated */
        id_please?: "true" | "false";
        /** Filter by observations that have community identifications */
        identified?: "true" | "false";
        /** Filter by observations of taxa that are introduced in their location */
        introduced?: "true" | "false";
        /** Filter by observations that show on map tiles */
        mappable?: "true" | "false";
        /** Filter by observations of taxa that are native to their location */
        native?: "true" | "false";
        /** Filter by observations of taxa that outside their known ranges */
        out_of_range?: "true" | "false";
        /** @deprecated */
        pcid?: "true" | "false";
        /** Filter by observations with photos */
        photos?: "true" | "false";
        /** Filter by observations that have been favorited by at least one user */
        popular?: "true" | "false";
        /** Filter by observations with sounds */
        sounds?: "true" | "false";
        /** Filter by observations of active taxa */
        taxon_is_active?: "true" | "false";
        /** Filter by whether the observed taxon has a conservation status of "threatened" or worse */
        threatened?: "true" | "false";
        /** Filter by whether observations are 'verifiable' (i.e. have quality grades `research` or `needs_id`) */
        verifiable?: "true" | "false";
        /** Include observations with this ID */
        id?: (string | number)[];
        /** Exclude observations with this ID */
        not_id?: string[];
        /** Include observations with this license */
        license?: (
          | "cc-by"
          | "cc-by-nc"
          | "cc-by-nd"
          | "cc-by-sa"
          | "cc-by-nc-nd"
          | "cc-by-nc-sa"
          | "cc0"
        )[];
        /** Include observations with least one photo with this license */
        photo_license?: (
          | "cc-by"
          | "cc-by-nc"
          | "cc-by-nd"
          | "cc-by-sa"
          | "cc-by-nc-nd"
          | "cc-by-nc-sa"
          | "cc0"
        )[];
        /** Include observations where the license attribute is not null, i.e. it is licensed */
        licensed?: "true" | "false";
        /** Include observations with at least one photo with a license attribute that is not null */
        photo_licensed?: "true" | "false";
        /** Include observations observed within the place with this ID */
        place_id?: (string | number)[];
        /** Include observations added to the project with this ID or slug */
        project_id?: (number | string)[];
        /** Filter by observers who trust the project(s) specified in `project_id` OR trust the authenticated viewer */
        coords_viewable_for_proj?: "true" | "false";
        /** Include observations of taxa with this rank */
        rank?: (
          | "stateofmatter"
          | "kingdom"
          | "phylum"
          | "subphylum"
          | "superclass"
          | "class"
          | "subclass"
          | "infraclass"
          | "subterclass"
          | "superorder"
          | "order"
          | "suborder"
          | "infraorder"
          | "parvorder"
          | "zoosection"
          | "zoosubsection"
          | "superfamily"
          | "epifamily"
          | "family"
          | "subfamily"
          | "supertribe"
          | "tribe"
          | "subtribe"
          | "genus"
          | "genushybrid"
          | "subgenus"
          | "section"
          | "subsection"
          | "complex"
          | "species"
          | "hybrid"
          | "subspecies"
          | "variety"
          | "form"
          | "infrahybrid"
        )[];
        /** Include observations affiliated with the iNaturalist network website with this ID */
        site_id?: number[];
        /** Include observations that have at least one sound with this license */
        sound_license?: (
          | "cc-by"
          | "cc-by-nc"
          | "cc-by-nd"
          | "cc-by-sa"
          | "cc-by-nc-nd"
          | "cc-by-nc-sa"
          | "cc0"
        )[];
        /** Include observations of this taxon and its descendants */
        taxon_id?: number[];
        /** Exclude observations of this taxon and its descendants */
        without_taxon_id?: number[];
        /** Include observations of taxa that have a scientific or common name matching this string */
        taxon_name?: string;
        /** Include observations observed by users that have this ID or login */
        user_id?: string[];
        /** Include observations observed by users that have this login */
        user_login?: string[];
        /** Include observations observed within this hour of the day */
        hour?: number[];
        /** Include observations observed within this day of the month */
        day?: number[];
        /** Include observations observed within this month */
        month?: number[];
        /** Include observations observed within this year */
        year?: number[];
        /** Include observations created within this day of the month */
        created_day?: number[];
        /** Include observations created within this month */
        created_month?: number[];
        /** Include observations created within this year */
        created_year?: number[];
        /** Include observations with annotations using this controlled term ID */
        term_id?: number[];
        /** Include observations with annotations using this controlled value ID. Must be combined with the `term_id` parameter */
        term_value_id?: number[];
        /** Exclude observations with annotations using this controlled value ID. Must be combined with the `term_id` parameter */
        without_term_value_id?: number[];
        /** Include observations with annotations using this controlled term ID and associated term value IDs, or be missing annotations using this controlled term ID. Must be combined with the `term_value_id` or `without_term_value_id` parameters */
        term_id_or_unknown?: number[];
        /** Include observations with an annotation created by this user */
        annotation_user_id?: string[];
        /** Include observations with a positional accuracy above this value (meters) */
        acc_above?: number;
        /** Include observations with a positional accuracy below this value (meters) */
        acc_below?: number;
        /** Include observations with a positional accuracy below this value (in meters) or with an unknown positional accuracy */
        acc_below_or_unknown?: number;
        /** Include observations observed on or after this date/time */
        d1?: string;
        /** Include observations observed on or before this date/time */
        d2?: string;
        /** Include observations created on or after this date/time */
        created_d1?: string;
        /** Include observations created on or before this date/time */
        created_d2?: string;
        /** Include observations created on this date */
        created_on?: string;
        /** Include observations observed on this date */
        observed_on?: string;
        /** Exclude observations of taxa previously observed by this user */
        unobserved_by_user_id?: string;
        /** Include observations that match the rules of the project with this ID or slug */
        apply_project_rules_for?: string;
        /** Include observations included in this observation accuracy experiment */
        observation_accuracy_experiment_id?: number[];
        /** Include observations of taxa that have this conservation status code. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
        cs?: string;
        /** Include observations of taxa that have a conservation status from this authority. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
        csa?: string;
        /** Include observations of taxa that have this IUCN conservation status. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
        csi?: ("LC" | "NT" | "VU" | "EN" | "CR" | "EW" | "EX")[];
        /** Include observations with this geoprivacy setting */
        geoprivacy?: ("obscured" | "obscured_private" | "open" | "private")[];
        /** Include observations where this is the most conservative geoprivacy applied by a conservation status associated with one of the taxa proposed in the current identifications */
        taxon_geoprivacy?: (
          | "obscured"
          | "obscured_private"
          | "open"
          | "private"
        )[];
        /** Include observations where `geoprivacy` or `taxon_geoprivacy` match these values */
        obscuration?: ("obscured" | "private" | "none")[];
        /** Include observations of taxa with this rank or lower */
        hrank?: (
          | "stateofmatter"
          | "kingdom"
          | "phylum"
          | "subphylum"
          | "superclass"
          | "class"
          | "subclass"
          | "infraclass"
          | "subterclass"
          | "superorder"
          | "order"
          | "suborder"
          | "infraorder"
          | "parvorder"
          | "zoosection"
          | "zoosubsection"
          | "superfamily"
          | "epifamily"
          | "family"
          | "subfamily"
          | "supertribe"
          | "tribe"
          | "subtribe"
          | "genus"
          | "genushybrid"
          | "subgenus"
          | "section"
          | "subsection"
          | "complex"
          | "species"
          | "hybrid"
          | "subspecies"
          | "variety"
          | "form"
          | "infrahybrid"
        )[];
        /** Include observations of taxa with this rank or higher */
        lrank?: (
          | "stateofmatter"
          | "kingdom"
          | "phylum"
          | "subphylum"
          | "superclass"
          | "class"
          | "subclass"
          | "infraclass"
          | "subterclass"
          | "superorder"
          | "order"
          | "suborder"
          | "infraorder"
          | "parvorder"
          | "zoosection"
          | "zoosubsection"
          | "superfamily"
          | "epifamily"
          | "family"
          | "subfamily"
          | "supertribe"
          | "tribe"
          | "subtribe"
          | "genus"
          | "genushybrid"
          | "subgenus"
          | "section"
          | "subsection"
          | "complex"
          | "species"
          | "hybrid"
          | "subspecies"
          | "variety"
          | "form"
          | "infrahybrid"
        )[];
        /** Include observations of taxa within this iconic taxon */
        iconic_taxa?: (
          | "Actinopterygii"
          | "Animalia"
          | "Amphibia"
          | "Arachnida"
          | "Aves"
          | "Chromista"
          | "Fungi"
          | "Insecta"
          | "Mammalia"
          | "Mollusca"
          | "Reptilia"
          | "Plantae"
          | "Protozoa"
          | "unknown"
        )[];
        /** Include observations with an ID above this value */
        id_above?: number;
        /** Include observations with an ID below this value */
        id_below?: number;
        /**
         * Include observations based on level of agreement among identifications:
         *
         * * **most_agree:** includes observations where there are more active identifications of taxa that agree with the Observation Taxon than active identifications that disagree with the Observation Taxon
         * * **some_agree:** includes observations where there are some active identifications of taxa that agree with the Observation Taxon
         * * **most_disagree:** includes observations where there are more active identifications of taxa that disagree with the Observation Taxon than active identifications that agree with the Observation Taxon
         */
        identifications?: "most_agree" | "most_disagree" | "some_agree";
        /** Include observations where there is disagreement among active identifications */
        disagreements?: "true" | "false";
        /**
         * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
         * @format float
         * @min -90
         * @max 90
         */
        lat?: number;
        /**
         * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
         * @format float
         * @min -180
         * @max 180
         */
        lng?: number;
        /**
         * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
         * @format float
         */
        radius?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -90
         * @max 90
         */
        nelat?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -180
         * @max 180
         */
        nelng?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -90
         * @max 90
         */
        swlat?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -180
         * @max 180
         */
        swlng?: number;
        /** Include observations of taxa in a list with this ID */
        list_id?: number;
        /** Exclude observations added to the project this ID or slug */
        not_in_project?: string[];
        /** Exclude observations that match the rules of the project with this ID or slug */
        not_matching_project_rules_for?: string;
        /** Include observations with a description, tags, or place_guess matching this query. Can be combined with `search_on` */
        q?: string;
        /** Include observations where any of these properties match the value of the `q` parameter */
        search_on?:
          | "names"
          | "tags"
          | "description"
          | "place"
          | "taxon_page_obs_photos";
        /** Include observations with this quality grade */
        quality_grade?: ("casual" | "needs_id" | "research")[];
        /** Exclude observations that are casual for any reason other than being marked captive */
        not_casual_excluding_captive?: "true" | "false";
        /** Exclude observations with this observation field */
        without_field?: string;
        /** Include observations with outlinks from this source */
        outlink_source?: string;
        /** Include observations updated since this time */
        updated_since?: string;
        /** Must be combined with the `reviewed` parameter */
        viewer_id?: number;
        /** Filter by observations reviewed by the user with ID matching the value of the `viewer_id` parameter */
        reviewed?: "true" | "false";
        /** Filter by observations expected to occur nearby their location according to the latest iNaturalist Geomodel */
        expected_nearby?: "true" | "false";
        /** Filter by observations voted as not accurately depicting an organism or scene */
        fails_dqa_accurate?: "true" | "false";
        /** Filter by observations voted as not having an accurate date */
        fails_dqa_date?: "true" | "false";
        /** Filter by observations voted as not evidence of an organism */
        fails_dqa_evidence?: "true" | "false";
        /** Filter by observations voted as not having an accurate location */
        fails_dqa_location?: "true" | "false";
        /** Filter by observations voted as the community ID cannot be improved */
        fails_dqa_needs_id?: "true" | "false";
        /** Filter by observations voted as not recent evidence of an organism */
        fails_dqa_recent?: "true" | "false";
        /** Filter by observations voted as not having evidence related to a single subject */
        fails_dqa_subject?: "true" | "false";
        /** Filter by observations voted as not wild */
        fails_dqa_wild?: "true" | "false";
        /** Include observations created by users created after a date. Accepts dates with or without times, e.g. 2025-01-01, as well as relative day, month, or year, e.g. 10d, 2w, 1y */
        user_after?: string;
        /** Include observations created by users created before a date. Accepts dates with or without times, e.g. 2025-01-01, as well as relative day, month, or year, e.g. 10d, 2w, 1y */
        user_before?: string;
        /** Returned taxon common names will be from this locale */
        locale?: string;
        /** Returned taxon common names will prioritize common names from this place */
        preferred_place_id?: number;
        /** Set the `Cache-Control` HTTP header with this value as `max-age`, in seconds. This means subsequent identical requests may be cached on  iNaturalist servers, and commonly within web browsers */
        ttl?: number;
        /**
         * Pagination `page` number
         * @min 0
         */
        page?: number;
        /** Number of results to return in a `page` */
        per_page?: number;
        /**
         * Sort order
         * @default "desc"
         */
        order?: "desc" | "asc";
        /**
         * Attribute to sort on
         * @default "created_at"
         */
        order_by?:
          | "created_at"
          | "geo_score"
          | "id"
          | "observed_on"
          | "random"
          | "species_guess"
          | "updated_at"
          | "votes";
        /** Include observations with this ID */
        only_id?: "true" | "false";
      },
      params: RequestParams = {},
    ) =>
      this.request<Blob, any>({
        path: `/points/${zoom}/${x}/${y}.png`,
        method: "GET",
        query: query,
        secure: true,
        format: "blob",
        ...params,
      }),

    /**
     * No description
     *
     * @tags UTFGrid
     * @name GridJsonList
     * @summary JSON for points tiles
     * @request GET:/points/{zoom}/{x}/{y}.grid.json
     * @secure
     */
    gridJsonList: (
      zoom: number,
      x: number,
      y: number,
      query?: {
        tile_size?: 256 | 512;
        /** Filter by whether `positional_accuracy` is set or not */
        acc?: "true" | "false";
        /** Filter by captive / cultivated status */
        captive?: "true" | "false";
        /** Filter by whether the observation is in a place with a check list entry indicating the establishment means is `endemic` */
        endemic?: "true" | "false";
        /** Filter by observations that are georeferenced */
        geo?: "true" | "false";
        /** @deprecated */
        id_please?: "true" | "false";
        /** Filter by observations that have community identifications */
        identified?: "true" | "false";
        /** Filter by observations of taxa that are introduced in their location */
        introduced?: "true" | "false";
        /** Filter by observations that show on map tiles */
        mappable?: "true" | "false";
        /** Filter by observations of taxa that are native to their location */
        native?: "true" | "false";
        /** Filter by observations of taxa that outside their known ranges */
        out_of_range?: "true" | "false";
        /** @deprecated */
        pcid?: "true" | "false";
        /** Filter by observations with photos */
        photos?: "true" | "false";
        /** Filter by observations that have been favorited by at least one user */
        popular?: "true" | "false";
        /** Filter by observations with sounds */
        sounds?: "true" | "false";
        /** Filter by observations of active taxa */
        taxon_is_active?: "true" | "false";
        /** Filter by whether the observed taxon has a conservation status of "threatened" or worse */
        threatened?: "true" | "false";
        /** Filter by whether observations are 'verifiable' (i.e. have quality grades `research` or `needs_id`) */
        verifiable?: "true" | "false";
        /** Include observations with this ID */
        id?: (string | number)[];
        /** Exclude observations with this ID */
        not_id?: string[];
        /** Include observations with this license */
        license?: (
          | "cc-by"
          | "cc-by-nc"
          | "cc-by-nd"
          | "cc-by-sa"
          | "cc-by-nc-nd"
          | "cc-by-nc-sa"
          | "cc0"
        )[];
        /** Include observations with least one photo with this license */
        photo_license?: (
          | "cc-by"
          | "cc-by-nc"
          | "cc-by-nd"
          | "cc-by-sa"
          | "cc-by-nc-nd"
          | "cc-by-nc-sa"
          | "cc0"
        )[];
        /** Include observations where the license attribute is not null, i.e. it is licensed */
        licensed?: "true" | "false";
        /** Include observations with at least one photo with a license attribute that is not null */
        photo_licensed?: "true" | "false";
        /** Include observations observed within the place with this ID */
        place_id?: (string | number)[];
        /** Include observations added to the project with this ID or slug */
        project_id?: (number | string)[];
        /** Filter by observers who trust the project(s) specified in `project_id` OR trust the authenticated viewer */
        coords_viewable_for_proj?: "true" | "false";
        /** Include observations of taxa with this rank */
        rank?: (
          | "stateofmatter"
          | "kingdom"
          | "phylum"
          | "subphylum"
          | "superclass"
          | "class"
          | "subclass"
          | "infraclass"
          | "subterclass"
          | "superorder"
          | "order"
          | "suborder"
          | "infraorder"
          | "parvorder"
          | "zoosection"
          | "zoosubsection"
          | "superfamily"
          | "epifamily"
          | "family"
          | "subfamily"
          | "supertribe"
          | "tribe"
          | "subtribe"
          | "genus"
          | "genushybrid"
          | "subgenus"
          | "section"
          | "subsection"
          | "complex"
          | "species"
          | "hybrid"
          | "subspecies"
          | "variety"
          | "form"
          | "infrahybrid"
        )[];
        /** Include observations affiliated with the iNaturalist network website with this ID */
        site_id?: number[];
        /** Include observations that have at least one sound with this license */
        sound_license?: (
          | "cc-by"
          | "cc-by-nc"
          | "cc-by-nd"
          | "cc-by-sa"
          | "cc-by-nc-nd"
          | "cc-by-nc-sa"
          | "cc0"
        )[];
        /** Include observations of this taxon and its descendants */
        taxon_id?: number[];
        /** Exclude observations of this taxon and its descendants */
        without_taxon_id?: number[];
        /** Include observations of taxa that have a scientific or common name matching this string */
        taxon_name?: string;
        /** Include observations observed by users that have this ID or login */
        user_id?: string[];
        /** Include observations observed by users that have this login */
        user_login?: string[];
        /** Include observations observed within this hour of the day */
        hour?: number[];
        /** Include observations observed within this day of the month */
        day?: number[];
        /** Include observations observed within this month */
        month?: number[];
        /** Include observations observed within this year */
        year?: number[];
        /** Include observations created within this day of the month */
        created_day?: number[];
        /** Include observations created within this month */
        created_month?: number[];
        /** Include observations created within this year */
        created_year?: number[];
        /** Include observations with annotations using this controlled term ID */
        term_id?: number[];
        /** Include observations with annotations using this controlled value ID. Must be combined with the `term_id` parameter */
        term_value_id?: number[];
        /** Exclude observations with annotations using this controlled value ID. Must be combined with the `term_id` parameter */
        without_term_value_id?: number[];
        /** Include observations with annotations using this controlled term ID and associated term value IDs, or be missing annotations using this controlled term ID. Must be combined with the `term_value_id` or `without_term_value_id` parameters */
        term_id_or_unknown?: number[];
        /** Include observations with an annotation created by this user */
        annotation_user_id?: string[];
        /** Include observations with a positional accuracy above this value (meters) */
        acc_above?: number;
        /** Include observations with a positional accuracy below this value (meters) */
        acc_below?: number;
        /** Include observations with a positional accuracy below this value (in meters) or with an unknown positional accuracy */
        acc_below_or_unknown?: number;
        /** Include observations observed on or after this date/time */
        d1?: string;
        /** Include observations observed on or before this date/time */
        d2?: string;
        /** Include observations created on or after this date/time */
        created_d1?: string;
        /** Include observations created on or before this date/time */
        created_d2?: string;
        /** Include observations created on this date */
        created_on?: string;
        /** Include observations observed on this date */
        observed_on?: string;
        /** Exclude observations of taxa previously observed by this user */
        unobserved_by_user_id?: string;
        /** Include observations that match the rules of the project with this ID or slug */
        apply_project_rules_for?: string;
        /** Include observations included in this observation accuracy experiment */
        observation_accuracy_experiment_id?: number[];
        /** Include observations of taxa that have this conservation status code. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
        cs?: string;
        /** Include observations of taxa that have a conservation status from this authority. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
        csa?: string;
        /** Include observations of taxa that have this IUCN conservation status. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
        csi?: ("LC" | "NT" | "VU" | "EN" | "CR" | "EW" | "EX")[];
        /** Include observations with this geoprivacy setting */
        geoprivacy?: ("obscured" | "obscured_private" | "open" | "private")[];
        /** Include observations where this is the most conservative geoprivacy applied by a conservation status associated with one of the taxa proposed in the current identifications */
        taxon_geoprivacy?: (
          | "obscured"
          | "obscured_private"
          | "open"
          | "private"
        )[];
        /** Include observations where `geoprivacy` or `taxon_geoprivacy` match these values */
        obscuration?: ("obscured" | "private" | "none")[];
        /** Include observations of taxa with this rank or lower */
        hrank?: (
          | "stateofmatter"
          | "kingdom"
          | "phylum"
          | "subphylum"
          | "superclass"
          | "class"
          | "subclass"
          | "infraclass"
          | "subterclass"
          | "superorder"
          | "order"
          | "suborder"
          | "infraorder"
          | "parvorder"
          | "zoosection"
          | "zoosubsection"
          | "superfamily"
          | "epifamily"
          | "family"
          | "subfamily"
          | "supertribe"
          | "tribe"
          | "subtribe"
          | "genus"
          | "genushybrid"
          | "subgenus"
          | "section"
          | "subsection"
          | "complex"
          | "species"
          | "hybrid"
          | "subspecies"
          | "variety"
          | "form"
          | "infrahybrid"
        )[];
        /** Include observations of taxa with this rank or higher */
        lrank?: (
          | "stateofmatter"
          | "kingdom"
          | "phylum"
          | "subphylum"
          | "superclass"
          | "class"
          | "subclass"
          | "infraclass"
          | "subterclass"
          | "superorder"
          | "order"
          | "suborder"
          | "infraorder"
          | "parvorder"
          | "zoosection"
          | "zoosubsection"
          | "superfamily"
          | "epifamily"
          | "family"
          | "subfamily"
          | "supertribe"
          | "tribe"
          | "subtribe"
          | "genus"
          | "genushybrid"
          | "subgenus"
          | "section"
          | "subsection"
          | "complex"
          | "species"
          | "hybrid"
          | "subspecies"
          | "variety"
          | "form"
          | "infrahybrid"
        )[];
        /** Include observations of taxa within this iconic taxon */
        iconic_taxa?: (
          | "Actinopterygii"
          | "Animalia"
          | "Amphibia"
          | "Arachnida"
          | "Aves"
          | "Chromista"
          | "Fungi"
          | "Insecta"
          | "Mammalia"
          | "Mollusca"
          | "Reptilia"
          | "Plantae"
          | "Protozoa"
          | "unknown"
        )[];
        /** Include observations with an ID above this value */
        id_above?: number;
        /** Include observations with an ID below this value */
        id_below?: number;
        /**
         * Include observations based on level of agreement among identifications:
         *
         * * **most_agree:** includes observations where there are more active identifications of taxa that agree with the Observation Taxon than active identifications that disagree with the Observation Taxon
         * * **some_agree:** includes observations where there are some active identifications of taxa that agree with the Observation Taxon
         * * **most_disagree:** includes observations where there are more active identifications of taxa that disagree with the Observation Taxon than active identifications that agree with the Observation Taxon
         */
        identifications?: "most_agree" | "most_disagree" | "some_agree";
        /** Include observations where there is disagreement among active identifications */
        disagreements?: "true" | "false";
        /**
         * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
         * @format float
         * @min -90
         * @max 90
         */
        lat?: number;
        /**
         * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
         * @format float
         * @min -180
         * @max 180
         */
        lng?: number;
        /**
         * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
         * @format float
         */
        radius?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -90
         * @max 90
         */
        nelat?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -180
         * @max 180
         */
        nelng?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -90
         * @max 90
         */
        swlat?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -180
         * @max 180
         */
        swlng?: number;
        /** Include observations of taxa in a list with this ID */
        list_id?: number;
        /** Exclude observations added to the project this ID or slug */
        not_in_project?: string[];
        /** Exclude observations that match the rules of the project with this ID or slug */
        not_matching_project_rules_for?: string;
        /** Include observations with a description, tags, or place_guess matching this query. Can be combined with `search_on` */
        q?: string;
        /** Include observations where any of these properties match the value of the `q` parameter */
        search_on?:
          | "names"
          | "tags"
          | "description"
          | "place"
          | "taxon_page_obs_photos";
        /** Include observations with this quality grade */
        quality_grade?: ("casual" | "needs_id" | "research")[];
        /** Exclude observations that are casual for any reason other than being marked captive */
        not_casual_excluding_captive?: "true" | "false";
        /** Exclude observations with this observation field */
        without_field?: string;
        /** Include observations with outlinks from this source */
        outlink_source?: string;
        /** Include observations updated since this time */
        updated_since?: string;
        /** Must be combined with the `reviewed` parameter */
        viewer_id?: number;
        /** Filter by observations reviewed by the user with ID matching the value of the `viewer_id` parameter */
        reviewed?: "true" | "false";
        /** Filter by observations expected to occur nearby their location according to the latest iNaturalist Geomodel */
        expected_nearby?: "true" | "false";
        /** Filter by observations voted as not accurately depicting an organism or scene */
        fails_dqa_accurate?: "true" | "false";
        /** Filter by observations voted as not having an accurate date */
        fails_dqa_date?: "true" | "false";
        /** Filter by observations voted as not evidence of an organism */
        fails_dqa_evidence?: "true" | "false";
        /** Filter by observations voted as not having an accurate location */
        fails_dqa_location?: "true" | "false";
        /** Filter by observations voted as the community ID cannot be improved */
        fails_dqa_needs_id?: "true" | "false";
        /** Filter by observations voted as not recent evidence of an organism */
        fails_dqa_recent?: "true" | "false";
        /** Filter by observations voted as not having evidence related to a single subject */
        fails_dqa_subject?: "true" | "false";
        /** Filter by observations voted as not wild */
        fails_dqa_wild?: "true" | "false";
        /** Include observations created by users created after a date. Accepts dates with or without times, e.g. 2025-01-01, as well as relative day, month, or year, e.g. 10d, 2w, 1y */
        user_after?: string;
        /** Include observations created by users created before a date. Accepts dates with or without times, e.g. 2025-01-01, as well as relative day, month, or year, e.g. 10d, 2w, 1y */
        user_before?: string;
        /** Returned taxon common names will be from this locale */
        locale?: string;
        /** Returned taxon common names will prioritize common names from this place */
        preferred_place_id?: number;
        /** Set the `Cache-Control` HTTP header with this value as `max-age`, in seconds. This means subsequent identical requests may be cached on  iNaturalist servers, and commonly within web browsers */
        ttl?: number;
        /**
         * Pagination `page` number
         * @min 0
         */
        page?: number;
        /** Number of results to return in a `page` */
        per_page?: number;
        /**
         * Sort order
         * @default "desc"
         */
        order?: "desc" | "asc";
        /**
         * Attribute to sort on
         * @default "created_at"
         */
        order_by?:
          | "created_at"
          | "geo_score"
          | "id"
          | "observed_on"
          | "random"
          | "species_guess"
          | "updated_at"
          | "votes";
        /** Include observations with this ID */
        only_id?: "true" | "false";
      },
      params: RequestParams = {},
    ) =>
      this.request<UtfGrid, any>({
        path: `/points/${zoom}/${x}/${y}.grid.json`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  heatmap = {
    /**
     * No description
     *
     * @tags Observation Tiles
     * @name PngList
     * @summary Heatmap Tiles
     * @request GET:/heatmap/{zoom}/{x}/{y}.png
     * @secure
     */
    pngList: (
      zoom: number,
      x: number,
      y: number,
      query?: {
        tile_size?: 256 | 512;
        /** Filter by whether `positional_accuracy` is set or not */
        acc?: "true" | "false";
        /** Filter by captive / cultivated status */
        captive?: "true" | "false";
        /** Filter by whether the observation is in a place with a check list entry indicating the establishment means is `endemic` */
        endemic?: "true" | "false";
        /** Filter by observations that are georeferenced */
        geo?: "true" | "false";
        /** @deprecated */
        id_please?: "true" | "false";
        /** Filter by observations that have community identifications */
        identified?: "true" | "false";
        /** Filter by observations of taxa that are introduced in their location */
        introduced?: "true" | "false";
        /** Filter by observations that show on map tiles */
        mappable?: "true" | "false";
        /** Filter by observations of taxa that are native to their location */
        native?: "true" | "false";
        /** Filter by observations of taxa that outside their known ranges */
        out_of_range?: "true" | "false";
        /** @deprecated */
        pcid?: "true" | "false";
        /** Filter by observations with photos */
        photos?: "true" | "false";
        /** Filter by observations that have been favorited by at least one user */
        popular?: "true" | "false";
        /** Filter by observations with sounds */
        sounds?: "true" | "false";
        /** Filter by observations of active taxa */
        taxon_is_active?: "true" | "false";
        /** Filter by whether the observed taxon has a conservation status of "threatened" or worse */
        threatened?: "true" | "false";
        /** Filter by whether observations are 'verifiable' (i.e. have quality grades `research` or `needs_id`) */
        verifiable?: "true" | "false";
        /** Include observations with this ID */
        id?: (string | number)[];
        /** Exclude observations with this ID */
        not_id?: string[];
        /** Include observations with this license */
        license?: (
          | "cc-by"
          | "cc-by-nc"
          | "cc-by-nd"
          | "cc-by-sa"
          | "cc-by-nc-nd"
          | "cc-by-nc-sa"
          | "cc0"
        )[];
        /** Include observations with least one photo with this license */
        photo_license?: (
          | "cc-by"
          | "cc-by-nc"
          | "cc-by-nd"
          | "cc-by-sa"
          | "cc-by-nc-nd"
          | "cc-by-nc-sa"
          | "cc0"
        )[];
        /** Include observations where the license attribute is not null, i.e. it is licensed */
        licensed?: "true" | "false";
        /** Include observations with at least one photo with a license attribute that is not null */
        photo_licensed?: "true" | "false";
        /** Include observations observed within the place with this ID */
        place_id?: (string | number)[];
        /** Include observations added to the project with this ID or slug */
        project_id?: (number | string)[];
        /** Filter by observers who trust the project(s) specified in `project_id` OR trust the authenticated viewer */
        coords_viewable_for_proj?: "true" | "false";
        /** Include observations of taxa with this rank */
        rank?: (
          | "stateofmatter"
          | "kingdom"
          | "phylum"
          | "subphylum"
          | "superclass"
          | "class"
          | "subclass"
          | "infraclass"
          | "subterclass"
          | "superorder"
          | "order"
          | "suborder"
          | "infraorder"
          | "parvorder"
          | "zoosection"
          | "zoosubsection"
          | "superfamily"
          | "epifamily"
          | "family"
          | "subfamily"
          | "supertribe"
          | "tribe"
          | "subtribe"
          | "genus"
          | "genushybrid"
          | "subgenus"
          | "section"
          | "subsection"
          | "complex"
          | "species"
          | "hybrid"
          | "subspecies"
          | "variety"
          | "form"
          | "infrahybrid"
        )[];
        /** Include observations affiliated with the iNaturalist network website with this ID */
        site_id?: number[];
        /** Include observations that have at least one sound with this license */
        sound_license?: (
          | "cc-by"
          | "cc-by-nc"
          | "cc-by-nd"
          | "cc-by-sa"
          | "cc-by-nc-nd"
          | "cc-by-nc-sa"
          | "cc0"
        )[];
        /** Include observations of this taxon and its descendants */
        taxon_id?: number[];
        /** Exclude observations of this taxon and its descendants */
        without_taxon_id?: number[];
        /** Include observations of taxa that have a scientific or common name matching this string */
        taxon_name?: string;
        /** Include observations observed by users that have this ID or login */
        user_id?: string[];
        /** Include observations observed by users that have this login */
        user_login?: string[];
        /** Include observations observed within this hour of the day */
        hour?: number[];
        /** Include observations observed within this day of the month */
        day?: number[];
        /** Include observations observed within this month */
        month?: number[];
        /** Include observations observed within this year */
        year?: number[];
        /** Include observations created within this day of the month */
        created_day?: number[];
        /** Include observations created within this month */
        created_month?: number[];
        /** Include observations created within this year */
        created_year?: number[];
        /** Include observations with annotations using this controlled term ID */
        term_id?: number[];
        /** Include observations with annotations using this controlled value ID. Must be combined with the `term_id` parameter */
        term_value_id?: number[];
        /** Exclude observations with annotations using this controlled value ID. Must be combined with the `term_id` parameter */
        without_term_value_id?: number[];
        /** Include observations with annotations using this controlled term ID and associated term value IDs, or be missing annotations using this controlled term ID. Must be combined with the `term_value_id` or `without_term_value_id` parameters */
        term_id_or_unknown?: number[];
        /** Include observations with an annotation created by this user */
        annotation_user_id?: string[];
        /** Include observations with a positional accuracy above this value (meters) */
        acc_above?: number;
        /** Include observations with a positional accuracy below this value (meters) */
        acc_below?: number;
        /** Include observations with a positional accuracy below this value (in meters) or with an unknown positional accuracy */
        acc_below_or_unknown?: number;
        /** Include observations observed on or after this date/time */
        d1?: string;
        /** Include observations observed on or before this date/time */
        d2?: string;
        /** Include observations created on or after this date/time */
        created_d1?: string;
        /** Include observations created on or before this date/time */
        created_d2?: string;
        /** Include observations created on this date */
        created_on?: string;
        /** Include observations observed on this date */
        observed_on?: string;
        /** Exclude observations of taxa previously observed by this user */
        unobserved_by_user_id?: string;
        /** Include observations that match the rules of the project with this ID or slug */
        apply_project_rules_for?: string;
        /** Include observations included in this observation accuracy experiment */
        observation_accuracy_experiment_id?: number[];
        /** Include observations of taxa that have this conservation status code. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
        cs?: string;
        /** Include observations of taxa that have a conservation status from this authority. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
        csa?: string;
        /** Include observations of taxa that have this IUCN conservation status. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
        csi?: ("LC" | "NT" | "VU" | "EN" | "CR" | "EW" | "EX")[];
        /** Include observations with this geoprivacy setting */
        geoprivacy?: ("obscured" | "obscured_private" | "open" | "private")[];
        /** Include observations where this is the most conservative geoprivacy applied by a conservation status associated with one of the taxa proposed in the current identifications */
        taxon_geoprivacy?: (
          | "obscured"
          | "obscured_private"
          | "open"
          | "private"
        )[];
        /** Include observations where `geoprivacy` or `taxon_geoprivacy` match these values */
        obscuration?: ("obscured" | "private" | "none")[];
        /** Include observations of taxa with this rank or lower */
        hrank?: (
          | "stateofmatter"
          | "kingdom"
          | "phylum"
          | "subphylum"
          | "superclass"
          | "class"
          | "subclass"
          | "infraclass"
          | "subterclass"
          | "superorder"
          | "order"
          | "suborder"
          | "infraorder"
          | "parvorder"
          | "zoosection"
          | "zoosubsection"
          | "superfamily"
          | "epifamily"
          | "family"
          | "subfamily"
          | "supertribe"
          | "tribe"
          | "subtribe"
          | "genus"
          | "genushybrid"
          | "subgenus"
          | "section"
          | "subsection"
          | "complex"
          | "species"
          | "hybrid"
          | "subspecies"
          | "variety"
          | "form"
          | "infrahybrid"
        )[];
        /** Include observations of taxa with this rank or higher */
        lrank?: (
          | "stateofmatter"
          | "kingdom"
          | "phylum"
          | "subphylum"
          | "superclass"
          | "class"
          | "subclass"
          | "infraclass"
          | "subterclass"
          | "superorder"
          | "order"
          | "suborder"
          | "infraorder"
          | "parvorder"
          | "zoosection"
          | "zoosubsection"
          | "superfamily"
          | "epifamily"
          | "family"
          | "subfamily"
          | "supertribe"
          | "tribe"
          | "subtribe"
          | "genus"
          | "genushybrid"
          | "subgenus"
          | "section"
          | "subsection"
          | "complex"
          | "species"
          | "hybrid"
          | "subspecies"
          | "variety"
          | "form"
          | "infrahybrid"
        )[];
        /** Include observations of taxa within this iconic taxon */
        iconic_taxa?: (
          | "Actinopterygii"
          | "Animalia"
          | "Amphibia"
          | "Arachnida"
          | "Aves"
          | "Chromista"
          | "Fungi"
          | "Insecta"
          | "Mammalia"
          | "Mollusca"
          | "Reptilia"
          | "Plantae"
          | "Protozoa"
          | "unknown"
        )[];
        /** Include observations with an ID above this value */
        id_above?: number;
        /** Include observations with an ID below this value */
        id_below?: number;
        /**
         * Include observations based on level of agreement among identifications:
         *
         * * **most_agree:** includes observations where there are more active identifications of taxa that agree with the Observation Taxon than active identifications that disagree with the Observation Taxon
         * * **some_agree:** includes observations where there are some active identifications of taxa that agree with the Observation Taxon
         * * **most_disagree:** includes observations where there are more active identifications of taxa that disagree with the Observation Taxon than active identifications that agree with the Observation Taxon
         */
        identifications?: "most_agree" | "most_disagree" | "some_agree";
        /** Include observations where there is disagreement among active identifications */
        disagreements?: "true" | "false";
        /**
         * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
         * @format float
         * @min -90
         * @max 90
         */
        lat?: number;
        /**
         * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
         * @format float
         * @min -180
         * @max 180
         */
        lng?: number;
        /**
         * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
         * @format float
         */
        radius?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -90
         * @max 90
         */
        nelat?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -180
         * @max 180
         */
        nelng?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -90
         * @max 90
         */
        swlat?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -180
         * @max 180
         */
        swlng?: number;
        /** Include observations of taxa in a list with this ID */
        list_id?: number;
        /** Exclude observations added to the project this ID or slug */
        not_in_project?: string[];
        /** Exclude observations that match the rules of the project with this ID or slug */
        not_matching_project_rules_for?: string;
        /** Include observations with a description, tags, or place_guess matching this query. Can be combined with `search_on` */
        q?: string;
        /** Include observations where any of these properties match the value of the `q` parameter */
        search_on?:
          | "names"
          | "tags"
          | "description"
          | "place"
          | "taxon_page_obs_photos";
        /** Include observations with this quality grade */
        quality_grade?: ("casual" | "needs_id" | "research")[];
        /** Exclude observations that are casual for any reason other than being marked captive */
        not_casual_excluding_captive?: "true" | "false";
        /** Exclude observations with this observation field */
        without_field?: string;
        /** Include observations with outlinks from this source */
        outlink_source?: string;
        /** Include observations updated since this time */
        updated_since?: string;
        /** Must be combined with the `reviewed` parameter */
        viewer_id?: number;
        /** Filter by observations reviewed by the user with ID matching the value of the `viewer_id` parameter */
        reviewed?: "true" | "false";
        /** Filter by observations expected to occur nearby their location according to the latest iNaturalist Geomodel */
        expected_nearby?: "true" | "false";
        /** Filter by observations voted as not accurately depicting an organism or scene */
        fails_dqa_accurate?: "true" | "false";
        /** Filter by observations voted as not having an accurate date */
        fails_dqa_date?: "true" | "false";
        /** Filter by observations voted as not evidence of an organism */
        fails_dqa_evidence?: "true" | "false";
        /** Filter by observations voted as not having an accurate location */
        fails_dqa_location?: "true" | "false";
        /** Filter by observations voted as the community ID cannot be improved */
        fails_dqa_needs_id?: "true" | "false";
        /** Filter by observations voted as not recent evidence of an organism */
        fails_dqa_recent?: "true" | "false";
        /** Filter by observations voted as not having evidence related to a single subject */
        fails_dqa_subject?: "true" | "false";
        /** Filter by observations voted as not wild */
        fails_dqa_wild?: "true" | "false";
        /** Include observations created by users created after a date. Accepts dates with or without times, e.g. 2025-01-01, as well as relative day, month, or year, e.g. 10d, 2w, 1y */
        user_after?: string;
        /** Include observations created by users created before a date. Accepts dates with or without times, e.g. 2025-01-01, as well as relative day, month, or year, e.g. 10d, 2w, 1y */
        user_before?: string;
        /** Returned taxon common names will be from this locale */
        locale?: string;
        /** Returned taxon common names will prioritize common names from this place */
        preferred_place_id?: number;
        /** Set the `Cache-Control` HTTP header with this value as `max-age`, in seconds. This means subsequent identical requests may be cached on  iNaturalist servers, and commonly within web browsers */
        ttl?: number;
        /**
         * Pagination `page` number
         * @min 0
         */
        page?: number;
        /** Number of results to return in a `page` */
        per_page?: number;
        /**
         * Sort order
         * @default "desc"
         */
        order?: "desc" | "asc";
        /**
         * Attribute to sort on
         * @default "created_at"
         */
        order_by?:
          | "created_at"
          | "geo_score"
          | "id"
          | "observed_on"
          | "random"
          | "species_guess"
          | "updated_at"
          | "votes";
        /** Include observations with this ID */
        only_id?: "true" | "false";
      },
      params: RequestParams = {},
    ) =>
      this.request<Blob, any>({
        path: `/heatmap/${zoom}/${x}/${y}.png`,
        method: "GET",
        query: query,
        secure: true,
        format: "blob",
        ...params,
      }),

    /**
     * No description
     *
     * @tags UTFGrid
     * @name GridJsonList
     * @summary JSON for heatmap tiles
     * @request GET:/heatmap/{zoom}/{x}/{y}.grid.json
     * @secure
     */
    gridJsonList: (
      zoom: number,
      x: number,
      y: number,
      query?: {
        tile_size?: 256 | 512;
        /** Filter by whether `positional_accuracy` is set or not */
        acc?: "true" | "false";
        /** Filter by captive / cultivated status */
        captive?: "true" | "false";
        /** Filter by whether the observation is in a place with a check list entry indicating the establishment means is `endemic` */
        endemic?: "true" | "false";
        /** Filter by observations that are georeferenced */
        geo?: "true" | "false";
        /** @deprecated */
        id_please?: "true" | "false";
        /** Filter by observations that have community identifications */
        identified?: "true" | "false";
        /** Filter by observations of taxa that are introduced in their location */
        introduced?: "true" | "false";
        /** Filter by observations that show on map tiles */
        mappable?: "true" | "false";
        /** Filter by observations of taxa that are native to their location */
        native?: "true" | "false";
        /** Filter by observations of taxa that outside their known ranges */
        out_of_range?: "true" | "false";
        /** @deprecated */
        pcid?: "true" | "false";
        /** Filter by observations with photos */
        photos?: "true" | "false";
        /** Filter by observations that have been favorited by at least one user */
        popular?: "true" | "false";
        /** Filter by observations with sounds */
        sounds?: "true" | "false";
        /** Filter by observations of active taxa */
        taxon_is_active?: "true" | "false";
        /** Filter by whether the observed taxon has a conservation status of "threatened" or worse */
        threatened?: "true" | "false";
        /** Filter by whether observations are 'verifiable' (i.e. have quality grades `research` or `needs_id`) */
        verifiable?: "true" | "false";
        /** Include observations with this ID */
        id?: (string | number)[];
        /** Exclude observations with this ID */
        not_id?: string[];
        /** Include observations with this license */
        license?: (
          | "cc-by"
          | "cc-by-nc"
          | "cc-by-nd"
          | "cc-by-sa"
          | "cc-by-nc-nd"
          | "cc-by-nc-sa"
          | "cc0"
        )[];
        /** Include observations with least one photo with this license */
        photo_license?: (
          | "cc-by"
          | "cc-by-nc"
          | "cc-by-nd"
          | "cc-by-sa"
          | "cc-by-nc-nd"
          | "cc-by-nc-sa"
          | "cc0"
        )[];
        /** Include observations where the license attribute is not null, i.e. it is licensed */
        licensed?: "true" | "false";
        /** Include observations with at least one photo with a license attribute that is not null */
        photo_licensed?: "true" | "false";
        /** Include observations observed within the place with this ID */
        place_id?: (string | number)[];
        /** Include observations added to the project with this ID or slug */
        project_id?: (number | string)[];
        /** Filter by observers who trust the project(s) specified in `project_id` OR trust the authenticated viewer */
        coords_viewable_for_proj?: "true" | "false";
        /** Include observations of taxa with this rank */
        rank?: (
          | "stateofmatter"
          | "kingdom"
          | "phylum"
          | "subphylum"
          | "superclass"
          | "class"
          | "subclass"
          | "infraclass"
          | "subterclass"
          | "superorder"
          | "order"
          | "suborder"
          | "infraorder"
          | "parvorder"
          | "zoosection"
          | "zoosubsection"
          | "superfamily"
          | "epifamily"
          | "family"
          | "subfamily"
          | "supertribe"
          | "tribe"
          | "subtribe"
          | "genus"
          | "genushybrid"
          | "subgenus"
          | "section"
          | "subsection"
          | "complex"
          | "species"
          | "hybrid"
          | "subspecies"
          | "variety"
          | "form"
          | "infrahybrid"
        )[];
        /** Include observations affiliated with the iNaturalist network website with this ID */
        site_id?: number[];
        /** Include observations that have at least one sound with this license */
        sound_license?: (
          | "cc-by"
          | "cc-by-nc"
          | "cc-by-nd"
          | "cc-by-sa"
          | "cc-by-nc-nd"
          | "cc-by-nc-sa"
          | "cc0"
        )[];
        /** Include observations of this taxon and its descendants */
        taxon_id?: number[];
        /** Exclude observations of this taxon and its descendants */
        without_taxon_id?: number[];
        /** Include observations of taxa that have a scientific or common name matching this string */
        taxon_name?: string;
        /** Include observations observed by users that have this ID or login */
        user_id?: string[];
        /** Include observations observed by users that have this login */
        user_login?: string[];
        /** Include observations observed within this hour of the day */
        hour?: number[];
        /** Include observations observed within this day of the month */
        day?: number[];
        /** Include observations observed within this month */
        month?: number[];
        /** Include observations observed within this year */
        year?: number[];
        /** Include observations created within this day of the month */
        created_day?: number[];
        /** Include observations created within this month */
        created_month?: number[];
        /** Include observations created within this year */
        created_year?: number[];
        /** Include observations with annotations using this controlled term ID */
        term_id?: number[];
        /** Include observations with annotations using this controlled value ID. Must be combined with the `term_id` parameter */
        term_value_id?: number[];
        /** Exclude observations with annotations using this controlled value ID. Must be combined with the `term_id` parameter */
        without_term_value_id?: number[];
        /** Include observations with annotations using this controlled term ID and associated term value IDs, or be missing annotations using this controlled term ID. Must be combined with the `term_value_id` or `without_term_value_id` parameters */
        term_id_or_unknown?: number[];
        /** Include observations with an annotation created by this user */
        annotation_user_id?: string[];
        /** Include observations with a positional accuracy above this value (meters) */
        acc_above?: number;
        /** Include observations with a positional accuracy below this value (meters) */
        acc_below?: number;
        /** Include observations with a positional accuracy below this value (in meters) or with an unknown positional accuracy */
        acc_below_or_unknown?: number;
        /** Include observations observed on or after this date/time */
        d1?: string;
        /** Include observations observed on or before this date/time */
        d2?: string;
        /** Include observations created on or after this date/time */
        created_d1?: string;
        /** Include observations created on or before this date/time */
        created_d2?: string;
        /** Include observations created on this date */
        created_on?: string;
        /** Include observations observed on this date */
        observed_on?: string;
        /** Exclude observations of taxa previously observed by this user */
        unobserved_by_user_id?: string;
        /** Include observations that match the rules of the project with this ID or slug */
        apply_project_rules_for?: string;
        /** Include observations included in this observation accuracy experiment */
        observation_accuracy_experiment_id?: number[];
        /** Include observations of taxa that have this conservation status code. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
        cs?: string;
        /** Include observations of taxa that have a conservation status from this authority. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
        csa?: string;
        /** Include observations of taxa that have this IUCN conservation status. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
        csi?: ("LC" | "NT" | "VU" | "EN" | "CR" | "EW" | "EX")[];
        /** Include observations with this geoprivacy setting */
        geoprivacy?: ("obscured" | "obscured_private" | "open" | "private")[];
        /** Include observations where this is the most conservative geoprivacy applied by a conservation status associated with one of the taxa proposed in the current identifications */
        taxon_geoprivacy?: (
          | "obscured"
          | "obscured_private"
          | "open"
          | "private"
        )[];
        /** Include observations where `geoprivacy` or `taxon_geoprivacy` match these values */
        obscuration?: ("obscured" | "private" | "none")[];
        /** Include observations of taxa with this rank or lower */
        hrank?: (
          | "stateofmatter"
          | "kingdom"
          | "phylum"
          | "subphylum"
          | "superclass"
          | "class"
          | "subclass"
          | "infraclass"
          | "subterclass"
          | "superorder"
          | "order"
          | "suborder"
          | "infraorder"
          | "parvorder"
          | "zoosection"
          | "zoosubsection"
          | "superfamily"
          | "epifamily"
          | "family"
          | "subfamily"
          | "supertribe"
          | "tribe"
          | "subtribe"
          | "genus"
          | "genushybrid"
          | "subgenus"
          | "section"
          | "subsection"
          | "complex"
          | "species"
          | "hybrid"
          | "subspecies"
          | "variety"
          | "form"
          | "infrahybrid"
        )[];
        /** Include observations of taxa with this rank or higher */
        lrank?: (
          | "stateofmatter"
          | "kingdom"
          | "phylum"
          | "subphylum"
          | "superclass"
          | "class"
          | "subclass"
          | "infraclass"
          | "subterclass"
          | "superorder"
          | "order"
          | "suborder"
          | "infraorder"
          | "parvorder"
          | "zoosection"
          | "zoosubsection"
          | "superfamily"
          | "epifamily"
          | "family"
          | "subfamily"
          | "supertribe"
          | "tribe"
          | "subtribe"
          | "genus"
          | "genushybrid"
          | "subgenus"
          | "section"
          | "subsection"
          | "complex"
          | "species"
          | "hybrid"
          | "subspecies"
          | "variety"
          | "form"
          | "infrahybrid"
        )[];
        /** Include observations of taxa within this iconic taxon */
        iconic_taxa?: (
          | "Actinopterygii"
          | "Animalia"
          | "Amphibia"
          | "Arachnida"
          | "Aves"
          | "Chromista"
          | "Fungi"
          | "Insecta"
          | "Mammalia"
          | "Mollusca"
          | "Reptilia"
          | "Plantae"
          | "Protozoa"
          | "unknown"
        )[];
        /** Include observations with an ID above this value */
        id_above?: number;
        /** Include observations with an ID below this value */
        id_below?: number;
        /**
         * Include observations based on level of agreement among identifications:
         *
         * * **most_agree:** includes observations where there are more active identifications of taxa that agree with the Observation Taxon than active identifications that disagree with the Observation Taxon
         * * **some_agree:** includes observations where there are some active identifications of taxa that agree with the Observation Taxon
         * * **most_disagree:** includes observations where there are more active identifications of taxa that disagree with the Observation Taxon than active identifications that agree with the Observation Taxon
         */
        identifications?: "most_agree" | "most_disagree" | "some_agree";
        /** Include observations where there is disagreement among active identifications */
        disagreements?: "true" | "false";
        /**
         * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
         * @format float
         * @min -90
         * @max 90
         */
        lat?: number;
        /**
         * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
         * @format float
         * @min -180
         * @max 180
         */
        lng?: number;
        /**
         * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
         * @format float
         */
        radius?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -90
         * @max 90
         */
        nelat?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -180
         * @max 180
         */
        nelng?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -90
         * @max 90
         */
        swlat?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -180
         * @max 180
         */
        swlng?: number;
        /** Include observations of taxa in a list with this ID */
        list_id?: number;
        /** Exclude observations added to the project this ID or slug */
        not_in_project?: string[];
        /** Exclude observations that match the rules of the project with this ID or slug */
        not_matching_project_rules_for?: string;
        /** Include observations with a description, tags, or place_guess matching this query. Can be combined with `search_on` */
        q?: string;
        /** Include observations where any of these properties match the value of the `q` parameter */
        search_on?:
          | "names"
          | "tags"
          | "description"
          | "place"
          | "taxon_page_obs_photos";
        /** Include observations with this quality grade */
        quality_grade?: ("casual" | "needs_id" | "research")[];
        /** Exclude observations that are casual for any reason other than being marked captive */
        not_casual_excluding_captive?: "true" | "false";
        /** Exclude observations with this observation field */
        without_field?: string;
        /** Include observations with outlinks from this source */
        outlink_source?: string;
        /** Include observations updated since this time */
        updated_since?: string;
        /** Must be combined with the `reviewed` parameter */
        viewer_id?: number;
        /** Filter by observations reviewed by the user with ID matching the value of the `viewer_id` parameter */
        reviewed?: "true" | "false";
        /** Filter by observations expected to occur nearby their location according to the latest iNaturalist Geomodel */
        expected_nearby?: "true" | "false";
        /** Filter by observations voted as not accurately depicting an organism or scene */
        fails_dqa_accurate?: "true" | "false";
        /** Filter by observations voted as not having an accurate date */
        fails_dqa_date?: "true" | "false";
        /** Filter by observations voted as not evidence of an organism */
        fails_dqa_evidence?: "true" | "false";
        /** Filter by observations voted as not having an accurate location */
        fails_dqa_location?: "true" | "false";
        /** Filter by observations voted as the community ID cannot be improved */
        fails_dqa_needs_id?: "true" | "false";
        /** Filter by observations voted as not recent evidence of an organism */
        fails_dqa_recent?: "true" | "false";
        /** Filter by observations voted as not having evidence related to a single subject */
        fails_dqa_subject?: "true" | "false";
        /** Filter by observations voted as not wild */
        fails_dqa_wild?: "true" | "false";
        /** Include observations created by users created after a date. Accepts dates with or without times, e.g. 2025-01-01, as well as relative day, month, or year, e.g. 10d, 2w, 1y */
        user_after?: string;
        /** Include observations created by users created before a date. Accepts dates with or without times, e.g. 2025-01-01, as well as relative day, month, or year, e.g. 10d, 2w, 1y */
        user_before?: string;
        /** Returned taxon common names will be from this locale */
        locale?: string;
        /** Returned taxon common names will prioritize common names from this place */
        preferred_place_id?: number;
        /** Set the `Cache-Control` HTTP header with this value as `max-age`, in seconds. This means subsequent identical requests may be cached on  iNaturalist servers, and commonly within web browsers */
        ttl?: number;
        /**
         * Pagination `page` number
         * @min 0
         */
        page?: number;
        /** Number of results to return in a `page` */
        per_page?: number;
        /**
         * Sort order
         * @default "desc"
         */
        order?: "desc" | "asc";
        /**
         * Attribute to sort on
         * @default "created_at"
         */
        order_by?:
          | "created_at"
          | "geo_score"
          | "id"
          | "observed_on"
          | "random"
          | "species_guess"
          | "updated_at"
          | "votes";
        /** Include observations with this ID */
        only_id?: "true" | "false";
      },
      params: RequestParams = {},
    ) =>
      this.request<UtfGrid, any>({
        path: `/heatmap/${zoom}/${x}/${y}.grid.json`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  grid = {
    /**
     * No description
     *
     * @tags Observation Tiles
     * @name PngList
     * @summary Grid Tiles
     * @request GET:/grid/{zoom}/{x}/{y}.png
     * @secure
     */
    pngList: (
      zoom: number,
      x: number,
      y: number,
      query?: {
        tile_size?: 256 | 512;
        /** Filter by whether `positional_accuracy` is set or not */
        acc?: "true" | "false";
        /** Filter by captive / cultivated status */
        captive?: "true" | "false";
        /** Filter by whether the observation is in a place with a check list entry indicating the establishment means is `endemic` */
        endemic?: "true" | "false";
        /** Filter by observations that are georeferenced */
        geo?: "true" | "false";
        /** @deprecated */
        id_please?: "true" | "false";
        /** Filter by observations that have community identifications */
        identified?: "true" | "false";
        /** Filter by observations of taxa that are introduced in their location */
        introduced?: "true" | "false";
        /** Filter by observations that show on map tiles */
        mappable?: "true" | "false";
        /** Filter by observations of taxa that are native to their location */
        native?: "true" | "false";
        /** Filter by observations of taxa that outside their known ranges */
        out_of_range?: "true" | "false";
        /** @deprecated */
        pcid?: "true" | "false";
        /** Filter by observations with photos */
        photos?: "true" | "false";
        /** Filter by observations that have been favorited by at least one user */
        popular?: "true" | "false";
        /** Filter by observations with sounds */
        sounds?: "true" | "false";
        /** Filter by observations of active taxa */
        taxon_is_active?: "true" | "false";
        /** Filter by whether the observed taxon has a conservation status of "threatened" or worse */
        threatened?: "true" | "false";
        /** Filter by whether observations are 'verifiable' (i.e. have quality grades `research` or `needs_id`) */
        verifiable?: "true" | "false";
        /** Include observations with this ID */
        id?: (string | number)[];
        /** Exclude observations with this ID */
        not_id?: string[];
        /** Include observations with this license */
        license?: (
          | "cc-by"
          | "cc-by-nc"
          | "cc-by-nd"
          | "cc-by-sa"
          | "cc-by-nc-nd"
          | "cc-by-nc-sa"
          | "cc0"
        )[];
        /** Include observations with least one photo with this license */
        photo_license?: (
          | "cc-by"
          | "cc-by-nc"
          | "cc-by-nd"
          | "cc-by-sa"
          | "cc-by-nc-nd"
          | "cc-by-nc-sa"
          | "cc0"
        )[];
        /** Include observations where the license attribute is not null, i.e. it is licensed */
        licensed?: "true" | "false";
        /** Include observations with at least one photo with a license attribute that is not null */
        photo_licensed?: "true" | "false";
        /** Include observations observed within the place with this ID */
        place_id?: (string | number)[];
        /** Include observations added to the project with this ID or slug */
        project_id?: (number | string)[];
        /** Filter by observers who trust the project(s) specified in `project_id` OR trust the authenticated viewer */
        coords_viewable_for_proj?: "true" | "false";
        /** Include observations of taxa with this rank */
        rank?: (
          | "stateofmatter"
          | "kingdom"
          | "phylum"
          | "subphylum"
          | "superclass"
          | "class"
          | "subclass"
          | "infraclass"
          | "subterclass"
          | "superorder"
          | "order"
          | "suborder"
          | "infraorder"
          | "parvorder"
          | "zoosection"
          | "zoosubsection"
          | "superfamily"
          | "epifamily"
          | "family"
          | "subfamily"
          | "supertribe"
          | "tribe"
          | "subtribe"
          | "genus"
          | "genushybrid"
          | "subgenus"
          | "section"
          | "subsection"
          | "complex"
          | "species"
          | "hybrid"
          | "subspecies"
          | "variety"
          | "form"
          | "infrahybrid"
        )[];
        /** Include observations affiliated with the iNaturalist network website with this ID */
        site_id?: number[];
        /** Include observations that have at least one sound with this license */
        sound_license?: (
          | "cc-by"
          | "cc-by-nc"
          | "cc-by-nd"
          | "cc-by-sa"
          | "cc-by-nc-nd"
          | "cc-by-nc-sa"
          | "cc0"
        )[];
        /** Include observations of this taxon and its descendants */
        taxon_id?: number[];
        /** Exclude observations of this taxon and its descendants */
        without_taxon_id?: number[];
        /** Include observations of taxa that have a scientific or common name matching this string */
        taxon_name?: string;
        /** Include observations observed by users that have this ID or login */
        user_id?: string[];
        /** Include observations observed by users that have this login */
        user_login?: string[];
        /** Include observations observed within this hour of the day */
        hour?: number[];
        /** Include observations observed within this day of the month */
        day?: number[];
        /** Include observations observed within this month */
        month?: number[];
        /** Include observations observed within this year */
        year?: number[];
        /** Include observations created within this day of the month */
        created_day?: number[];
        /** Include observations created within this month */
        created_month?: number[];
        /** Include observations created within this year */
        created_year?: number[];
        /** Include observations with annotations using this controlled term ID */
        term_id?: number[];
        /** Include observations with annotations using this controlled value ID. Must be combined with the `term_id` parameter */
        term_value_id?: number[];
        /** Exclude observations with annotations using this controlled value ID. Must be combined with the `term_id` parameter */
        without_term_value_id?: number[];
        /** Include observations with annotations using this controlled term ID and associated term value IDs, or be missing annotations using this controlled term ID. Must be combined with the `term_value_id` or `without_term_value_id` parameters */
        term_id_or_unknown?: number[];
        /** Include observations with an annotation created by this user */
        annotation_user_id?: string[];
        /** Include observations with a positional accuracy above this value (meters) */
        acc_above?: number;
        /** Include observations with a positional accuracy below this value (meters) */
        acc_below?: number;
        /** Include observations with a positional accuracy below this value (in meters) or with an unknown positional accuracy */
        acc_below_or_unknown?: number;
        /** Include observations observed on or after this date/time */
        d1?: string;
        /** Include observations observed on or before this date/time */
        d2?: string;
        /** Include observations created on or after this date/time */
        created_d1?: string;
        /** Include observations created on or before this date/time */
        created_d2?: string;
        /** Include observations created on this date */
        created_on?: string;
        /** Include observations observed on this date */
        observed_on?: string;
        /** Exclude observations of taxa previously observed by this user */
        unobserved_by_user_id?: string;
        /** Include observations that match the rules of the project with this ID or slug */
        apply_project_rules_for?: string;
        /** Include observations included in this observation accuracy experiment */
        observation_accuracy_experiment_id?: number[];
        /** Include observations of taxa that have this conservation status code. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
        cs?: string;
        /** Include observations of taxa that have a conservation status from this authority. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
        csa?: string;
        /** Include observations of taxa that have this IUCN conservation status. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
        csi?: ("LC" | "NT" | "VU" | "EN" | "CR" | "EW" | "EX")[];
        /** Include observations with this geoprivacy setting */
        geoprivacy?: ("obscured" | "obscured_private" | "open" | "private")[];
        /** Include observations where this is the most conservative geoprivacy applied by a conservation status associated with one of the taxa proposed in the current identifications */
        taxon_geoprivacy?: (
          | "obscured"
          | "obscured_private"
          | "open"
          | "private"
        )[];
        /** Include observations where `geoprivacy` or `taxon_geoprivacy` match these values */
        obscuration?: ("obscured" | "private" | "none")[];
        /** Include observations of taxa with this rank or lower */
        hrank?: (
          | "stateofmatter"
          | "kingdom"
          | "phylum"
          | "subphylum"
          | "superclass"
          | "class"
          | "subclass"
          | "infraclass"
          | "subterclass"
          | "superorder"
          | "order"
          | "suborder"
          | "infraorder"
          | "parvorder"
          | "zoosection"
          | "zoosubsection"
          | "superfamily"
          | "epifamily"
          | "family"
          | "subfamily"
          | "supertribe"
          | "tribe"
          | "subtribe"
          | "genus"
          | "genushybrid"
          | "subgenus"
          | "section"
          | "subsection"
          | "complex"
          | "species"
          | "hybrid"
          | "subspecies"
          | "variety"
          | "form"
          | "infrahybrid"
        )[];
        /** Include observations of taxa with this rank or higher */
        lrank?: (
          | "stateofmatter"
          | "kingdom"
          | "phylum"
          | "subphylum"
          | "superclass"
          | "class"
          | "subclass"
          | "infraclass"
          | "subterclass"
          | "superorder"
          | "order"
          | "suborder"
          | "infraorder"
          | "parvorder"
          | "zoosection"
          | "zoosubsection"
          | "superfamily"
          | "epifamily"
          | "family"
          | "subfamily"
          | "supertribe"
          | "tribe"
          | "subtribe"
          | "genus"
          | "genushybrid"
          | "subgenus"
          | "section"
          | "subsection"
          | "complex"
          | "species"
          | "hybrid"
          | "subspecies"
          | "variety"
          | "form"
          | "infrahybrid"
        )[];
        /** Include observations of taxa within this iconic taxon */
        iconic_taxa?: (
          | "Actinopterygii"
          | "Animalia"
          | "Amphibia"
          | "Arachnida"
          | "Aves"
          | "Chromista"
          | "Fungi"
          | "Insecta"
          | "Mammalia"
          | "Mollusca"
          | "Reptilia"
          | "Plantae"
          | "Protozoa"
          | "unknown"
        )[];
        /** Include observations with an ID above this value */
        id_above?: number;
        /** Include observations with an ID below this value */
        id_below?: number;
        /**
         * Include observations based on level of agreement among identifications:
         *
         * * **most_agree:** includes observations where there are more active identifications of taxa that agree with the Observation Taxon than active identifications that disagree with the Observation Taxon
         * * **some_agree:** includes observations where there are some active identifications of taxa that agree with the Observation Taxon
         * * **most_disagree:** includes observations where there are more active identifications of taxa that disagree with the Observation Taxon than active identifications that agree with the Observation Taxon
         */
        identifications?: "most_agree" | "most_disagree" | "some_agree";
        /** Include observations where there is disagreement among active identifications */
        disagreements?: "true" | "false";
        /**
         * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
         * @format float
         * @min -90
         * @max 90
         */
        lat?: number;
        /**
         * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
         * @format float
         * @min -180
         * @max 180
         */
        lng?: number;
        /**
         * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
         * @format float
         */
        radius?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -90
         * @max 90
         */
        nelat?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -180
         * @max 180
         */
        nelng?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -90
         * @max 90
         */
        swlat?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -180
         * @max 180
         */
        swlng?: number;
        /** Include observations of taxa in a list with this ID */
        list_id?: number;
        /** Exclude observations added to the project this ID or slug */
        not_in_project?: string[];
        /** Exclude observations that match the rules of the project with this ID or slug */
        not_matching_project_rules_for?: string;
        /** Include observations with a description, tags, or place_guess matching this query. Can be combined with `search_on` */
        q?: string;
        /** Include observations where any of these properties match the value of the `q` parameter */
        search_on?:
          | "names"
          | "tags"
          | "description"
          | "place"
          | "taxon_page_obs_photos";
        /** Include observations with this quality grade */
        quality_grade?: ("casual" | "needs_id" | "research")[];
        /** Exclude observations that are casual for any reason other than being marked captive */
        not_casual_excluding_captive?: "true" | "false";
        /** Exclude observations with this observation field */
        without_field?: string;
        /** Include observations with outlinks from this source */
        outlink_source?: string;
        /** Include observations updated since this time */
        updated_since?: string;
        /** Must be combined with the `reviewed` parameter */
        viewer_id?: number;
        /** Filter by observations reviewed by the user with ID matching the value of the `viewer_id` parameter */
        reviewed?: "true" | "false";
        /** Filter by observations expected to occur nearby their location according to the latest iNaturalist Geomodel */
        expected_nearby?: "true" | "false";
        /** Filter by observations voted as not accurately depicting an organism or scene */
        fails_dqa_accurate?: "true" | "false";
        /** Filter by observations voted as not having an accurate date */
        fails_dqa_date?: "true" | "false";
        /** Filter by observations voted as not evidence of an organism */
        fails_dqa_evidence?: "true" | "false";
        /** Filter by observations voted as not having an accurate location */
        fails_dqa_location?: "true" | "false";
        /** Filter by observations voted as the community ID cannot be improved */
        fails_dqa_needs_id?: "true" | "false";
        /** Filter by observations voted as not recent evidence of an organism */
        fails_dqa_recent?: "true" | "false";
        /** Filter by observations voted as not having evidence related to a single subject */
        fails_dqa_subject?: "true" | "false";
        /** Filter by observations voted as not wild */
        fails_dqa_wild?: "true" | "false";
        /** Include observations created by users created after a date. Accepts dates with or without times, e.g. 2025-01-01, as well as relative day, month, or year, e.g. 10d, 2w, 1y */
        user_after?: string;
        /** Include observations created by users created before a date. Accepts dates with or without times, e.g. 2025-01-01, as well as relative day, month, or year, e.g. 10d, 2w, 1y */
        user_before?: string;
        /** Returned taxon common names will be from this locale */
        locale?: string;
        /** Returned taxon common names will prioritize common names from this place */
        preferred_place_id?: number;
        /** Set the `Cache-Control` HTTP header with this value as `max-age`, in seconds. This means subsequent identical requests may be cached on  iNaturalist servers, and commonly within web browsers */
        ttl?: number;
        /**
         * Pagination `page` number
         * @min 0
         */
        page?: number;
        /** Number of results to return in a `page` */
        per_page?: number;
        /**
         * Sort order
         * @default "desc"
         */
        order?: "desc" | "asc";
        /**
         * Attribute to sort on
         * @default "created_at"
         */
        order_by?:
          | "created_at"
          | "geo_score"
          | "id"
          | "observed_on"
          | "random"
          | "species_guess"
          | "updated_at"
          | "votes";
        /** Include observations with this ID */
        only_id?: "true" | "false";
      },
      params: RequestParams = {},
    ) =>
      this.request<Blob, any>({
        path: `/grid/${zoom}/${x}/${y}.png`,
        method: "GET",
        query: query,
        secure: true,
        format: "blob",
        ...params,
      }),

    /**
     * No description
     *
     * @tags UTFGrid
     * @name GridJsonList
     * @summary JSON for grid tiles
     * @request GET:/grid/{zoom}/{x}/{y}.grid.json
     * @secure
     */
    gridJsonList: (
      zoom: number,
      x: number,
      y: number,
      query?: {
        tile_size?: 256 | 512;
        /** Filter by whether `positional_accuracy` is set or not */
        acc?: "true" | "false";
        /** Filter by captive / cultivated status */
        captive?: "true" | "false";
        /** Filter by whether the observation is in a place with a check list entry indicating the establishment means is `endemic` */
        endemic?: "true" | "false";
        /** Filter by observations that are georeferenced */
        geo?: "true" | "false";
        /** @deprecated */
        id_please?: "true" | "false";
        /** Filter by observations that have community identifications */
        identified?: "true" | "false";
        /** Filter by observations of taxa that are introduced in their location */
        introduced?: "true" | "false";
        /** Filter by observations that show on map tiles */
        mappable?: "true" | "false";
        /** Filter by observations of taxa that are native to their location */
        native?: "true" | "false";
        /** Filter by observations of taxa that outside their known ranges */
        out_of_range?: "true" | "false";
        /** @deprecated */
        pcid?: "true" | "false";
        /** Filter by observations with photos */
        photos?: "true" | "false";
        /** Filter by observations that have been favorited by at least one user */
        popular?: "true" | "false";
        /** Filter by observations with sounds */
        sounds?: "true" | "false";
        /** Filter by observations of active taxa */
        taxon_is_active?: "true" | "false";
        /** Filter by whether the observed taxon has a conservation status of "threatened" or worse */
        threatened?: "true" | "false";
        /** Filter by whether observations are 'verifiable' (i.e. have quality grades `research` or `needs_id`) */
        verifiable?: "true" | "false";
        /** Include observations with this ID */
        id?: (string | number)[];
        /** Exclude observations with this ID */
        not_id?: string[];
        /** Include observations with this license */
        license?: (
          | "cc-by"
          | "cc-by-nc"
          | "cc-by-nd"
          | "cc-by-sa"
          | "cc-by-nc-nd"
          | "cc-by-nc-sa"
          | "cc0"
        )[];
        /** Include observations with least one photo with this license */
        photo_license?: (
          | "cc-by"
          | "cc-by-nc"
          | "cc-by-nd"
          | "cc-by-sa"
          | "cc-by-nc-nd"
          | "cc-by-nc-sa"
          | "cc0"
        )[];
        /** Include observations where the license attribute is not null, i.e. it is licensed */
        licensed?: "true" | "false";
        /** Include observations with at least one photo with a license attribute that is not null */
        photo_licensed?: "true" | "false";
        /** Include observations observed within the place with this ID */
        place_id?: (string | number)[];
        /** Include observations added to the project with this ID or slug */
        project_id?: (number | string)[];
        /** Filter by observers who trust the project(s) specified in `project_id` OR trust the authenticated viewer */
        coords_viewable_for_proj?: "true" | "false";
        /** Include observations of taxa with this rank */
        rank?: (
          | "stateofmatter"
          | "kingdom"
          | "phylum"
          | "subphylum"
          | "superclass"
          | "class"
          | "subclass"
          | "infraclass"
          | "subterclass"
          | "superorder"
          | "order"
          | "suborder"
          | "infraorder"
          | "parvorder"
          | "zoosection"
          | "zoosubsection"
          | "superfamily"
          | "epifamily"
          | "family"
          | "subfamily"
          | "supertribe"
          | "tribe"
          | "subtribe"
          | "genus"
          | "genushybrid"
          | "subgenus"
          | "section"
          | "subsection"
          | "complex"
          | "species"
          | "hybrid"
          | "subspecies"
          | "variety"
          | "form"
          | "infrahybrid"
        )[];
        /** Include observations affiliated with the iNaturalist network website with this ID */
        site_id?: number[];
        /** Include observations that have at least one sound with this license */
        sound_license?: (
          | "cc-by"
          | "cc-by-nc"
          | "cc-by-nd"
          | "cc-by-sa"
          | "cc-by-nc-nd"
          | "cc-by-nc-sa"
          | "cc0"
        )[];
        /** Include observations of this taxon and its descendants */
        taxon_id?: number[];
        /** Exclude observations of this taxon and its descendants */
        without_taxon_id?: number[];
        /** Include observations of taxa that have a scientific or common name matching this string */
        taxon_name?: string;
        /** Include observations observed by users that have this ID or login */
        user_id?: string[];
        /** Include observations observed by users that have this login */
        user_login?: string[];
        /** Include observations observed within this hour of the day */
        hour?: number[];
        /** Include observations observed within this day of the month */
        day?: number[];
        /** Include observations observed within this month */
        month?: number[];
        /** Include observations observed within this year */
        year?: number[];
        /** Include observations created within this day of the month */
        created_day?: number[];
        /** Include observations created within this month */
        created_month?: number[];
        /** Include observations created within this year */
        created_year?: number[];
        /** Include observations with annotations using this controlled term ID */
        term_id?: number[];
        /** Include observations with annotations using this controlled value ID. Must be combined with the `term_id` parameter */
        term_value_id?: number[];
        /** Exclude observations with annotations using this controlled value ID. Must be combined with the `term_id` parameter */
        without_term_value_id?: number[];
        /** Include observations with annotations using this controlled term ID and associated term value IDs, or be missing annotations using this controlled term ID. Must be combined with the `term_value_id` or `without_term_value_id` parameters */
        term_id_or_unknown?: number[];
        /** Include observations with an annotation created by this user */
        annotation_user_id?: string[];
        /** Include observations with a positional accuracy above this value (meters) */
        acc_above?: number;
        /** Include observations with a positional accuracy below this value (meters) */
        acc_below?: number;
        /** Include observations with a positional accuracy below this value (in meters) or with an unknown positional accuracy */
        acc_below_or_unknown?: number;
        /** Include observations observed on or after this date/time */
        d1?: string;
        /** Include observations observed on or before this date/time */
        d2?: string;
        /** Include observations created on or after this date/time */
        created_d1?: string;
        /** Include observations created on or before this date/time */
        created_d2?: string;
        /** Include observations created on this date */
        created_on?: string;
        /** Include observations observed on this date */
        observed_on?: string;
        /** Exclude observations of taxa previously observed by this user */
        unobserved_by_user_id?: string;
        /** Include observations that match the rules of the project with this ID or slug */
        apply_project_rules_for?: string;
        /** Include observations included in this observation accuracy experiment */
        observation_accuracy_experiment_id?: number[];
        /** Include observations of taxa that have this conservation status code. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
        cs?: string;
        /** Include observations of taxa that have a conservation status from this authority. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
        csa?: string;
        /** Include observations of taxa that have this IUCN conservation status. If the `place_id` parameter is also specified, this will only consider statuses specific to that place */
        csi?: ("LC" | "NT" | "VU" | "EN" | "CR" | "EW" | "EX")[];
        /** Include observations with this geoprivacy setting */
        geoprivacy?: ("obscured" | "obscured_private" | "open" | "private")[];
        /** Include observations where this is the most conservative geoprivacy applied by a conservation status associated with one of the taxa proposed in the current identifications */
        taxon_geoprivacy?: (
          | "obscured"
          | "obscured_private"
          | "open"
          | "private"
        )[];
        /** Include observations where `geoprivacy` or `taxon_geoprivacy` match these values */
        obscuration?: ("obscured" | "private" | "none")[];
        /** Include observations of taxa with this rank or lower */
        hrank?: (
          | "stateofmatter"
          | "kingdom"
          | "phylum"
          | "subphylum"
          | "superclass"
          | "class"
          | "subclass"
          | "infraclass"
          | "subterclass"
          | "superorder"
          | "order"
          | "suborder"
          | "infraorder"
          | "parvorder"
          | "zoosection"
          | "zoosubsection"
          | "superfamily"
          | "epifamily"
          | "family"
          | "subfamily"
          | "supertribe"
          | "tribe"
          | "subtribe"
          | "genus"
          | "genushybrid"
          | "subgenus"
          | "section"
          | "subsection"
          | "complex"
          | "species"
          | "hybrid"
          | "subspecies"
          | "variety"
          | "form"
          | "infrahybrid"
        )[];
        /** Include observations of taxa with this rank or higher */
        lrank?: (
          | "stateofmatter"
          | "kingdom"
          | "phylum"
          | "subphylum"
          | "superclass"
          | "class"
          | "subclass"
          | "infraclass"
          | "subterclass"
          | "superorder"
          | "order"
          | "suborder"
          | "infraorder"
          | "parvorder"
          | "zoosection"
          | "zoosubsection"
          | "superfamily"
          | "epifamily"
          | "family"
          | "subfamily"
          | "supertribe"
          | "tribe"
          | "subtribe"
          | "genus"
          | "genushybrid"
          | "subgenus"
          | "section"
          | "subsection"
          | "complex"
          | "species"
          | "hybrid"
          | "subspecies"
          | "variety"
          | "form"
          | "infrahybrid"
        )[];
        /** Include observations of taxa within this iconic taxon */
        iconic_taxa?: (
          | "Actinopterygii"
          | "Animalia"
          | "Amphibia"
          | "Arachnida"
          | "Aves"
          | "Chromista"
          | "Fungi"
          | "Insecta"
          | "Mammalia"
          | "Mollusca"
          | "Reptilia"
          | "Plantae"
          | "Protozoa"
          | "unknown"
        )[];
        /** Include observations with an ID above this value */
        id_above?: number;
        /** Include observations with an ID below this value */
        id_below?: number;
        /**
         * Include observations based on level of agreement among identifications:
         *
         * * **most_agree:** includes observations where there are more active identifications of taxa that agree with the Observation Taxon than active identifications that disagree with the Observation Taxon
         * * **some_agree:** includes observations where there are some active identifications of taxa that agree with the Observation Taxon
         * * **most_disagree:** includes observations where there are more active identifications of taxa that disagree with the Observation Taxon than active identifications that agree with the Observation Taxon
         */
        identifications?: "most_agree" | "most_disagree" | "some_agree";
        /** Include observations where there is disagreement among active identifications */
        disagreements?: "true" | "false";
        /**
         * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
         * @format float
         * @min -90
         * @max 90
         */
        lat?: number;
        /**
         * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
         * @format float
         * @min -180
         * @max 180
         */
        lng?: number;
        /**
         * Include observations within a {`radius`} kilometer circle around the specified `lat`/`lng` parameters
         * @format float
         */
        radius?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -90
         * @max 90
         */
        nelat?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -180
         * @max 180
         */
        nelng?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -90
         * @max 90
         */
        swlat?: number;
        /**
         * Include observations within a bounding box specified by the `nelat`, `nelng`, `swlat`, and `swlng` parameters
         * @format float
         * @min -180
         * @max 180
         */
        swlng?: number;
        /** Include observations of taxa in a list with this ID */
        list_id?: number;
        /** Exclude observations added to the project this ID or slug */
        not_in_project?: string[];
        /** Exclude observations that match the rules of the project with this ID or slug */
        not_matching_project_rules_for?: string;
        /** Include observations with a description, tags, or place_guess matching this query. Can be combined with `search_on` */
        q?: string;
        /** Include observations where any of these properties match the value of the `q` parameter */
        search_on?:
          | "names"
          | "tags"
          | "description"
          | "place"
          | "taxon_page_obs_photos";
        /** Include observations with this quality grade */
        quality_grade?: ("casual" | "needs_id" | "research")[];
        /** Exclude observations that are casual for any reason other than being marked captive */
        not_casual_excluding_captive?: "true" | "false";
        /** Exclude observations with this observation field */
        without_field?: string;
        /** Include observations with outlinks from this source */
        outlink_source?: string;
        /** Include observations updated since this time */
        updated_since?: string;
        /** Must be combined with the `reviewed` parameter */
        viewer_id?: number;
        /** Filter by observations reviewed by the user with ID matching the value of the `viewer_id` parameter */
        reviewed?: "true" | "false";
        /** Filter by observations expected to occur nearby their location according to the latest iNaturalist Geomodel */
        expected_nearby?: "true" | "false";
        /** Filter by observations voted as not accurately depicting an organism or scene */
        fails_dqa_accurate?: "true" | "false";
        /** Filter by observations voted as not having an accurate date */
        fails_dqa_date?: "true" | "false";
        /** Filter by observations voted as not evidence of an organism */
        fails_dqa_evidence?: "true" | "false";
        /** Filter by observations voted as not having an accurate location */
        fails_dqa_location?: "true" | "false";
        /** Filter by observations voted as the community ID cannot be improved */
        fails_dqa_needs_id?: "true" | "false";
        /** Filter by observations voted as not recent evidence of an organism */
        fails_dqa_recent?: "true" | "false";
        /** Filter by observations voted as not having evidence related to a single subject */
        fails_dqa_subject?: "true" | "false";
        /** Filter by observations voted as not wild */
        fails_dqa_wild?: "true" | "false";
        /** Include observations created by users created after a date. Accepts dates with or without times, e.g. 2025-01-01, as well as relative day, month, or year, e.g. 10d, 2w, 1y */
        user_after?: string;
        /** Include observations created by users created before a date. Accepts dates with or without times, e.g. 2025-01-01, as well as relative day, month, or year, e.g. 10d, 2w, 1y */
        user_before?: string;
        /** Returned taxon common names will be from this locale */
        locale?: string;
        /** Returned taxon common names will prioritize common names from this place */
        preferred_place_id?: number;
        /** Set the `Cache-Control` HTTP header with this value as `max-age`, in seconds. This means subsequent identical requests may be cached on  iNaturalist servers, and commonly within web browsers */
        ttl?: number;
        /**
         * Pagination `page` number
         * @min 0
         */
        page?: number;
        /** Number of results to return in a `page` */
        per_page?: number;
        /**
         * Sort order
         * @default "desc"
         */
        order?: "desc" | "asc";
        /**
         * Attribute to sort on
         * @default "created_at"
         */
        order_by?:
          | "created_at"
          | "geo_score"
          | "id"
          | "observed_on"
          | "random"
          | "species_guess"
          | "updated_at"
          | "votes";
        /** Include observations with this ID */
        only_id?: "true" | "false";
      },
      params: RequestParams = {},
    ) =>
      this.request<UtfGrid, any>({
        path: `/grid/${zoom}/${x}/${y}.grid.json`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  geomodel = {
    /**
     * No description
     *
     * @tags Polygon Tiles
     * @name PngList
     * @summary Taxon Geomodel Tiles
     * @request GET:/geomodel/{id}/{zoom}/{x}/{y}.png
     * @secure
     */
    pngList: (
      id: string,
      zoom: number,
      x: number,
      y: number,
      query?: {
        tile_size?: 256 | 512;
        /** Set to true to render only cells above the Seen Nearby threshold */
        thresholded?: "true" | "false";
      },
      params: RequestParams = {},
    ) =>
      this.request<Blob, any>({
        path: `/geomodel/${id}/${zoom}/${x}/${y}.png`,
        method: "GET",
        query: query,
        secure: true,
        format: "blob",
        ...params,
      }),
  };
  geomodelTaxonRange = {
    /**
     * No description
     *
     * @tags Polygon Tiles
     * @name PngList
     * @summary Taxon Geomodel Taxon Range Tiles
     * @request GET:/geomodel_taxon_range/{id}/{zoom}/{x}/{y}.png
     * @secure
     */
    pngList: (
      id: string,
      zoom: number,
      x: number,
      y: number,
      query?: {
        tile_size?: 256 | 512;
      },
      params: RequestParams = {},
    ) =>
      this.request<Blob, any>({
        path: `/geomodel_taxon_range/${id}/${zoom}/${x}/${y}.png`,
        method: "GET",
        query: query,
        secure: true,
        format: "blob",
        ...params,
      }),
  };
  geomodelComparison = {
    /**
     * No description
     *
     * @tags Polygon Tiles
     * @name PngList
     * @summary Taxon Geomodel Comparison Tiles
     * @request GET:/geomodel_comparison/{id}/{zoom}/{x}/{y}.png
     * @secure
     */
    pngList: (
      id: string,
      zoom: number,
      x: number,
      y: number,
      query?: {
        tile_size?: 256 | 512;
      },
      params: RequestParams = {},
    ) =>
      this.request<Blob, any>({
        path: `/geomodel_comparison/${id}/${zoom}/${x}/${y}.png`,
        method: "GET",
        query: query,
        secure: true,
        format: "blob",
        ...params,
      }),
  };
}
