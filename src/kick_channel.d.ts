/// <reference types="node" />

/**
 * @public
 */
export declare interface Badge {
    id: number;
    channel_id: number;
    months: number;
    badge_image: {
        srcset: string;
        src: string;
    };
}

/**
 * @public
 */
export declare interface ResponsiveImage {
    responsive: string;
    url: string;
}

/**
 * @public
 */
export declare interface Category {
    id: number;
    category_id: number;
    name: string;
    slug: string;
    tags: string[];
    description: string?;
    deleted_at: string?;
    banner: ResponsiveImage;
    category: {
        id: number;
        name: string;
        slug: string;
        icon: string;
    };
}

declare interface BaseStream {
    id: number;
    slug: string;
    channel_id: number;
    created_at: string;
    session_title: string;
    is_live: bool;
    /** No clue yet */
    risk_level_id: any?;
    /** No clue yet */
    source: any?;
    /** No clue yet */
    twitch_channel: any?;
    duration: number;
    language: string;
    is_mature: boolean;
    viewer_count: number;
}

/**
 * @public
 */
export declare interface LiveStream extends BaseStream {
    thumbnail: ResponsiveImage;
    viewers: number;
    categories: Category[];
    tags: string[];
}

/**
 * @public
 */
export declare interface PreviousStream extends BaseStream {
    thumbnail: {
        src: string;
        srcset: string;
    };
    views: number;
    tags: string[];
    categories: Category[];
    video: {
        id: number;
        live_stream_id: number;
        slug: string?;
        thumb: any?;
        s3: any?;
        trading_platform_id: any?;
        created_at: string;
        updated_at: string?;
        uuid: string;
        views: number;
        deleted_at: string?;
    }
}

/**
 * @public
 */
export declare interface User {
    id: number;
    username: string;
    agreed_to_terms: boolean;
    bio: string?;
    country: string?;
    state: string?;
    city: string?;
    instagram: string?;
    twitter: string?;
    youtube: string?;
    discord: string?;
    tiktok: string?;
    facebook: string?;
    profile_pic: string?;
}

/**
 * @public
 */
export declare interface ChatRoom {
    id: number;
    chatable_type: string;
    channel_id: number;
    created_at: string;
    updated_at: string?;
    /** subscribers_only is a guess for now */
    chat_mode_old: 'public'|'followers_only'|'subscribers_only';
    /** subscribers_only is a guess for now */
    chat_mode: 'public'|'followers_only'|'subscribers_only';
    slow_mode: boolean;
    chatable_id: number;
}

/**
 * @public
 */
export declare interface Link {
    id: number;
    channel_id: number;
    description: string;
    link: string;
    created_at: string;
    updated_at: string?;
    order: number;
    title: string;
}

/**
 * @public
 */
export declare interface Plan {
    id: number;
    channel_id: number;
    stripe_plan_id: string;
    amount: string;
    created_at: string;
    updated_at: string?;
}

/**
 * @public
 */
export declare interface Verified {
    id: number;
    channel_id: number;
    created_at: string;
    updated_at: string?;
}

/**
 * @public
 */
export declare interface Media {
    id: number;
    model_type: string;
    model_id: number;
    collection_name: string;
    name: string;
    file_name: string;
    mime_type: string;
    disk: string;
    size: number;
    manipulations: any[];
    custom_properties: {
        generated_conversions: {
            fullsize: boolean;
            medium: boolean;
        };
    };
    responsive_images: ResponsiveImage[];
    order_column: number;
    created_at: string;
    updated_at: string?;
    uuid: string;
    conversions_disk: string;
}

/**
 * @public
 */
export declare interface Channel {
    id: number;
    user_id: number;
    slug: string;
    playback_url: string?;
    name_updated_at: string?;
    vod_enabled: boolean;
    subscription_enabled: boolean;
    followersCount: number;
    subscriber_badges: Badge[];
    banner_image: ResponsiveImage?;
    recent_categories: Category[];
    livestream: LiveStream?;
    /** No clue yet, even for Trainwreckstv it's null */
    role: any?;
    muted: boolean;
    /** No clue yet, even for Trainwreckstv it's an empty array */
    follower_badges: any[];
    /** Guess at the moment, even for Trainwreckstv it's null */
    offline_banner_image: ResponsiveImage?;
    can_host: boolean;
    user: User;
    chatroom: ChatRoom;
    ascending_links: Link[];
    plan: Plan?;
    previous_livestreams: PreviousStream[];
    verified: Verified?;
    media: Media[];
}
