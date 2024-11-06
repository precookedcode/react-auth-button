import React from "react";
import {
    Auth,
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
    GithubAuthProvider,
    OAuthProvider,
    User,
} from "firebase/auth";
import { IconButton } from "@precooked/react-icon-button";
import { Button } from "@precooked/react-button";

interface AuthButtonProps {
    auth: Auth; // Recibe la instancia de auth configurada desde afuera
    provider: "google" | "facebook" | "github" | "apple" | "microsoft" | "twitter" | "email";
    onAuthSuccess: (user: User) => void;
    onAuthError?: (error: Error) => void;
    title?: string;
    icon?: string;
    iconPaths?: any[];
    iconSize?: number;
    style?: React.CSSProperties;
    hasShadow?: boolean;
    borderRadius?: number;
    type?: "clear" | "outline" | "solid";
    titleStyle?: React.CSSProperties;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    color?: string;
}

const providerColors: Record<string, string> = {
    google: "#DB4437",
    facebook: "#1877F2",
    github: "#333333",
    apple: "#000000",
    microsoft: "#0078D4",
    twitter: "#1DA1F2",
    email: "#0A66C2",
};

const AuthButton: React.FC<AuthButtonProps> = ({
    auth,
    provider,
    onAuthSuccess,
    onAuthError,
    title,
    iconSize = 24,
    icon,
    iconPaths,
    style,
    hasShadow = true,
    titleStyle,
    size = "md",
    color,
    type = "solid",
    borderRadius = 4,
}) => {
    const handleAuth = async () => {
        try {
            let result;
            switch (provider) {
                case "google":
                    result = await signInWithPopup(auth, new GoogleAuthProvider());
                    break;
                case "facebook":
                    result = await signInWithPopup(auth, new FacebookAuthProvider());
                    break;
                case "github":
                    result = await signInWithPopup(auth, new GithubAuthProvider());
                    break;
                case "apple":
                    result = await signInWithPopup(auth, new OAuthProvider('apple.com'));
                    break;
                case "microsoft":
                    result = await signInWithPopup(auth, new OAuthProvider('microsoft.com'));
                    break;
                case "twitter":
                    result = await signInWithPopup(auth, new OAuthProvider('twitter.com'));
                    break;
                case "email":
                    throw new Error("Email auth not implemented in this button. Use a custom form.");
                default:
                    throw new Error("Unsupported provider.");
            }
            if (result && result.user) {
                onAuthSuccess(result.user);
            }
        } catch (error) {
            if (onAuthError) {
                onAuthError(error as Error);
            } else {
                console.error("Authentication error:", error);
            }
        }
    };

    const resolvedColor = color || providerColors[provider] || "#000000";
    const resolvedIcon = icon || provider;

    return title ? (
        <Button
            onClick={handleAuth}
            startIcon={resolvedIcon}
            startIconSize={iconSize}
            startIconPaths={iconPaths}
            title={title}
            titleStyle={titleStyle}
            style={style}
            hasShadow={hasShadow}
            borderRadius={borderRadius}
            type={type}
            size={size}
            color={resolvedColor}
        />
    ) : (
        <IconButton
            onClick={handleAuth}
            icon={resolvedIcon}
            iconPaths={iconPaths}
            iconSize={iconSize}
            style={style}
            hasShadow={hasShadow}
            borderRadius={borderRadius}
            type={type}
            size={size}
            color={resolvedColor}
        />
    );
};

export default AuthButton;
