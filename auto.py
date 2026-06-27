#!/usr/bin/env python3
"""
Theama - Environment Setup Script
Automatically creates .env files for frontend and backend
Prompts for API keys and configures everything
"""

import os
import sys
import json
from pathlib import Path
from getpass import getpass


# ─── Color codes for terminal output ───
class Colors:
    CRIMSON = '\033[38;5;161m'
    GOLD = '\033[38;5;178m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    RED = '\033[91m'
    WHITE = '\033[97m'
    BOLD = '\033[1m'
    DIM = '\033[2m'
    RESET = '\033[0m'


def print_banner():
    """Print the Theama ASCII banner"""
    banner = f"""{Colors.CRIMSON}
    ╔══════════════════════════════════════════════╗
    ║                                              ║
    ║     🎭  T H E A M A  🎭                      ║
    ║     Environment Setup Wizard                 ║
    ║     "Enter the Spectacle"                    ║
    ║                                              ║
    ╚══════════════════════════════════════════════╝
    {Colors.RESET}"""
    print(banner)


def print_step(step_num, total_steps, description):
    """Print a formatted step indicator"""
    print(f"\n{Colors.GOLD}━━━ Step {step_num}/{total_steps}: {description} ━━━{Colors.RESET}")


def print_success(message):
    """Print a success message"""
    print(f"{Colors.GREEN}✅ {message}{Colors.RESET}")


def print_error(message):
    """Print an error message"""
    print(f"{Colors.RED}❌ {message}{Colors.RESET}")


def print_info(message):
    """Print an info message"""
    print(f"{Colors.DIM}ℹ️  {message}{Colors.RESET}")


def print_warning(message):
    """Print a warning message"""
    print(f"{Colors.YELLOW}⚠️  {message}{Colors.RESET}")


def get_input_with_default(prompt, default=None):
    """Get user input with an optional default value"""
    if default:
        result = input(f"{Colors.WHITE}{prompt} [{default}]: {Colors.RESET}")
        return result if result.strip() else default
    return input(f"{Colors.WHITE}{prompt}: {Colors.RESET}")


def get_secure_input(prompt):
    """Get a secure input (hidden characters)"""
    return getpass(f"{Colors.WHITE}{prompt}: {Colors.RESET}")


def validate_not_empty(value, field_name):
    """Validate that a value is not empty"""
    if not value or not value.strip():
        print_error(f"{field_name} cannot be empty!")
        return False
    return True


def validate_url(value):
    """Basic URL validation"""
    if not value.startswith("https://"):
        print_warning("URL should start with https://")
        return False
    return True


def validate_supabase_url(value):
    """Validate Supabase URL format"""
    if not value or not value.strip():
        return False
    if not value.startswith("https://"):
        return False
    if ".supabase.co" not in value:
        print_warning("Supabase URL should contain '.supabase.co'")
        return False
    return True


def validate_tmdb_key(value):
    """Validate TMDB API key format"""
    if not value or not value.strip():
        return False
    if len(value) < 20:
        print_warning("TMDB API key seems too short. Please check.")
        return False
    return True


def collect_api_keys():
    """Collect all API keys from the user"""
    config = {}
    
    print(f"\n{Colors.BOLD}{Colors.CRIMSON}🎭 FIRST: Let's get your TMDB API Keys{Colors.RESET}")
    print_info("Sign up at: https://www.themoviedb.org/signup")
    print_info("Then go to: Settings → API → Create API Key")
    print_info(f"Use this URL when asked: {Colors.GOLD}https://localhost:3000{Colors.RESET}")
    
    # TMDB API Key
    while True:
        tmdb_key = get_secure_input("\nEnter your TMDB API Key (v3 auth)")
        if validate_tmdb_key(tmdb_key):
            config["TMDB_API_KEY"] = tmdb_key
            print_success("TMDB API Key saved")
            break
        else:
            print_error("Invalid TMDB API Key. Please try again.")
    
    # TMDB Read Access Token
    while True:
        tmdb_token = get_secure_input("\nEnter your TMDB API Read Access Token (v4 auth)")
        if validate_tmdb_key(tmdb_token):
            config["TMDB_API_READ_ACCESS_TOKEN"] = tmdb_token
            print_success("TMDB Read Access Token saved")
            break
        else:
            print_error("Invalid token. Please try again.")
    
    print(f"\n{Colors.BOLD}{Colors.CRIMSON}🎭 SECOND: Let's get your Supabase Keys{Colors.RESET}")
    print_info("Sign up at: https://supabase.com")
    print_info("Create a new project, then go to: Settings → API")
    
    # Supabase URL
    while True:
        supabase_url = get_input_with_default(
            "\nEnter your Supabase Project URL",
            "https://your-project-id.supabase.co"
        )
        if validate_supabase_url(supabase_url):
            config["SUPABASE_URL"] = supabase_url
            print_success("Supabase URL saved")
            break
        else:
            print_error("Invalid Supabase URL. Example: https://abc123def.supabase.co")
    
    # Supabase Anon Key
    while True:
        supabase_anon = get_secure_input("\nEnter your Supabase ANON Public Key")
        if validate_not_empty(supabase_anon, "ANON Key"):
            config["SUPABASE_ANON_KEY"] = supabase_anon
            print_success("Supabase ANON Key saved")
            break
    
    # Supabase Service Role Key
    print_warning("\n⚠️  SERVICE ROLE KEY: This bypasses all security. Keep it secret!")
    while True:
        supabase_service = get_secure_input("Enter your Supabase SERVICE ROLE Key")
        if validate_not_empty(supabase_service, "Service Role Key"):
            config["SUPABASE_SERVICE_ROLE_KEY"] = supabase_service
            print_success("Supabase Service Role Key saved")
            break
    
    return config


def collect_urls():
    """Collect URL configuration"""
    urls = {}
    
    print(f"\n{Colors.BOLD}{Colors.CRIMSON}🎭 THIRD: Configure URLs{Colors.RESET}")
    
    # Frontend URL
    frontend_url = get_input_with_default(
        "Frontend URL (where your app runs)",
        "https://localhost:3000"
    )
    urls["FRONTEND_URL"] = frontend_url
    urls["NEXT_PUBLIC_SITE_URL"] = frontend_url
    
    # Backend URL
    backend_url = get_input_with_default(
        "Backend URL (where your API runs)",
        "https://localhost:3001"
    )
    urls["BACKEND_URL"] = backend_url
    urls["NEXT_PUBLIC_API_URL"] = backend_url + "/v1"
    
    # Backend port
    port = get_input_with_default("Backend port", "3001")
    urls["PORT"] = port
    urls["CORS_ORIGIN"] = frontend_url
    
    print_success("URLs configured")
    return urls


def create_directory_structure():
    """Create the necessary directory structure"""
    print(f"\n{Colors.BOLD}{Colors.CRIMSON}🎭 Creating directory structure...{Colors.RESET}")
    
    directories = [
        "frontend",
        "backend",
        "backend/src",
        "backend/src/middleware",
        "backend/src/routes",
        "backend/src/controllers",
        "backend/src/services",
        "backend/src/utils",
        "backend/src/config",
        "supabase/migrations"
    ]
    
    for directory in directories:
        Path(directory).mkdir(parents=True, exist_ok=True)
        print_success(f"Created: {directory}/")
    
    return True


def create_env_files(config, urls):
    """Create the .env files"""
    print(f"\n{Colors.BOLD}{Colors.CRIMSON}🎭 Creating environment files...{Colors.RESET}")
    
    # Frontend .env.local
    frontend_env = f"""# ─── Theama Frontend Environment Variables ───
# Generated by Theama Setup Wizard
# DO NOT commit this file to Git!

# Supabase (Public - safe for frontend)
NEXT_PUBLIC_SUPABASE_URL={config['SUPABASE_URL']}
NEXT_PUBLIC_SUPABASE_ANON_KEY={config['SUPABASE_ANON_KEY']}

# API URLs
NEXT_PUBLIC_API_URL={urls['NEXT_PUBLIC_API_URL']}
NEXT_PUBLIC_SITE_URL={urls['NEXT_PUBLIC_SITE_URL']}
"""
    
    frontend_path = Path("frontend/.env.local")
    frontend_path.write_text(frontend_env)
    print_success(f"Created: {frontend_path}")
    
    # Frontend .env.example (safe for Git - no real keys)
    frontend_example = """# ─── Theama Frontend Environment Variables ───
# Copy this file to .env.local and fill in your values

# Supabase (Public - safe for frontend)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# API URLs
NEXT_PUBLIC_API_URL=https://localhost:3001/v1
NEXT_PUBLIC_SITE_URL=https://localhost:3000
"""
    
    frontend_example_path = Path("frontend/.env.example")
    frontend_example_path.write_text(frontend_example)
    print_success(f"Created: {frontend_example_path}")
    
    # Backend .env
    backend_env = f"""# ─── Theama Backend Environment Variables ───
# Generated by Theama Setup Wizard
# DO NOT commit this file to Git!

# Supabase
SUPABASE_URL={config['SUPABASE_URL']}
SUPABASE_SERVICE_ROLE_KEY={config['SUPABASE_SERVICE_ROLE_KEY']}

# TMDB
TMDB_API_KEY={config['TMDB_API_KEY']}
TMDB_API_READ_ACCESS_TOKEN={config['TMDB_API_READ_ACCESS_TOKEN']}

# Server
PORT={urls['PORT']}
NODE_ENV=development
CORS_ORIGIN={urls['CORS_ORIGIN']}

# Rate Limiting
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=debug
"""
    
    backend_path = Path("backend/.env")
    backend_path.write_text(backend_env)
    print_success(f"Created: {backend_path}")
    
    # Backend .env.example
    backend_example = """# ─── Theama Backend Environment Variables ───
# Copy this file to .env and fill in your values

# Supabase
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# TMDB
TMDB_API_KEY=your-tmdb-api-key-here
TMDB_API_READ_ACCESS_TOKEN=your-tmdb-read-access-token-here

# Server
PORT=3001
NODE_ENV=development
CORS_ORIGIN=https://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=debug
"""
    
    backend_example_path = Path("backend/.env.example")
    backend_example_path.write_text(backend_example)
    print_success(f"Created: {backend_example_path}")
    
    return True


def create_gitignore():
    """Create .gitignore file"""
    print(f"\n{Colors.BOLD}{Colors.CRIMSON}🎭 Creating .gitignore...{Colors.RESET}")
    
    gitignore_content = """# ─── Dependencies ───
node_modules/
.pnp
.pnp.js

# ─── Build outputs ───
.next/
out/
dist/
build/

# ─── Environment files (CRITICAL - Never commit real keys!) ───
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
.env*.local

# ─── Logs ───
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# ─── OS files ───
.DS_Store
Thumbs.db

# ─── IDE ───
.vscode/
.idea/
*.swp
*.swo

# ─── Testing ───
coverage/
.nyc_output/

# ─── Misc ───
*.pem
.env.staging
.cache/
temp/
tmp/
"""
    
    gitignore_path = Path(".gitignore")
    
    if gitignore_path.exists():
        print_warning(".gitignore already exists. Appending to it...")
        with open(gitignore_path, "a") as f:
            f.write("\n# Added by Theama Setup Wizard\n.env.local\n")
    else:
        gitignore_path.write_text(gitignore_content)
    
    print_success(f"Created: {gitignore_path}")
    return True


def create_setup_summary(config, urls):
    """Create a JSON summary of the setup"""
    summary = {
        "project": "Theama",
        "setup_date": "run_date_placeholder",
        "frontend_url": urls["FRONTEND_URL"],
        "backend_url": urls["BACKEND_URL"],
        "supabase_url": config["SUPABASE_URL"],
        "files_created": [
            "frontend/.env.local",
            "frontend/.env.example",
            "backend/.env",
            "backend/.env.example",
            ".gitignore"
        ],
        "next_steps": [
            "1. Run: cd backend && npm install && npm run dev",
            "2. Run: cd frontend && npm install && npm run dev",
            "3. Run Supabase migrations from supabase/migrations/",
            "4. Open " + urls["FRONTEND_URL"] + " in your browser",
            "5. Sign up at TMDB with URL: " + urls["FRONTEND_URL"]
        ]
    }
    
    summary_path = Path("setup-summary.json")
    summary_path.write_text(json.dumps(summary, indent=2))
    print_success(f"Created: {summary_path}")


def verify_setup():
    """Verify that all files were created correctly"""
    print(f"\n{Colors.BOLD}{Colors.CRIMSON}🎭 Verifying setup...{Colors.RESET}")
    
    files_to_check = [
        "frontend/.env.local",
        "frontend/.env.example",
        "backend/.env",
        "backend/.env.example",
        ".gitignore"
    ]
    
    all_good = True
    for file_path in files_to_check:
        if Path(file_path).exists():
            print_success(f"Found: {file_path}")
        else:
            print_error(f"Missing: {file_path}")
            all_good = False
    
    return all_good


def main():
    """Main setup wizard function"""
    print_banner()
    
    print(f"{Colors.BOLD}{Colors.GOLD}Welcome to the Theama Setup Wizard!{Colors.RESET}")
    print(f"{Colors.DIM}This will configure your environment with all required API keys.{Colors.RESET}")
    print(f"{Colors.DIM}Your keys will be stored in .env files (never committed to Git).{Colors.RESET}")
    
    # Confirm start
    confirm = input(f"\n{Colors.WHITE}Ready to begin? (Y/n): {Colors.RESET}")
    if confirm.lower() not in ["", "y", "yes"]:
        print_info("Setup cancelled. Goodbye!")
        sys.exit(0)
    
    # Step 1: Create directories
    print_step(1, 5, "Creating project directory structure")
    create_directory_structure()
    
    # Step 2: Collect API keys
    print_step(2, 5, "Collecting API keys")
    config = collect_api_keys()
    
    # Step 3: Configure URLs
    print_step(3, 5, "Configuring URLs")
    urls = collect_urls()
    
    # Step 4: Create environment files
    print_step(4, 5, "Creating environment files")
    create_env_files(config, urls)
    create_gitignore()
    
    # Step 5: Verify and summarize
    print_step(5, 5, "Verifying setup")
    create_setup_summary(config, urls)
    success = verify_setup()
    
    # Final output
    print(f"\n{Colors.BOLD}{Colors.CRIMSON}{'═' * 60}{Colors.RESET}")
    if success:
        print(f"{Colors.GREEN}{Colors.BOLD}🎭 Setup Complete! The curtain rises...{Colors.RESET}")
    else:
        print(f"{Colors.YELLOW}{Colors.BOLD}⚠️  Setup finished with warnings. Check above.{Colors.RESET}")
    
    print(f"\n{Colors.BOLD}{Colors.GOLD}📋 Next Steps:{Colors.RESET}")
    print(f"{Colors.WHITE}1. Install backend dependencies:{Colors.RESET}")
    print(f"   {Colors.DIM}cd backend && npm install{Colors.RESET}")
    print(f"{Colors.WHITE}2. Install frontend dependencies:{Colors.RESET}")
    print(f"   {Colors.DIM}cd frontend && npm install{Colors.RESET}")
    print(f"{Colors.WHITE}3. Run Supabase migrations:{Colors.RESET}")
    print(f"   {Colors.DIM}supabase db push{Colors.RESET}")
    print(f"{Colors.WHITE}4. Start backend:{Colors.RESET}")
    print(f"   {Colors.DIM}cd backend && npm run dev{Colors.RESET}")
    print(f"{Colors.WHITE}5. Start frontend (new terminal):{Colors.RESET}")
    print(f"   {Colors.DIM}cd frontend && npm run dev{Colors.RESET}")
    print(f"{Colors.WHITE}6. Open:{Colors.RESET}")
    print(f"   {Colors.GOLD}{urls['FRONTEND_URL']}{Colors.RESET}")
    print(f"\n{Colors.BOLD}{Colors.GOLD}🔑 TMDB Registration:{Colors.RESET}")
    print(f"   Application URL to use: {Colors.GOLD}{urls['FRONTEND_URL']}{Colors.RESET}")
    print(f"\n{Colors.DIM}Your keys are safely stored. Never commit .env files!{Colors.RESET}")
    print(f"{Colors.CRIMSON}{'═' * 60}{Colors.RESET}\n")


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print(f"\n\n{Colors.YELLOW}Setup interrupted. No files were harmed.{Colors.RESET}")
        sys.exit(0)
    except Exception as e:
        print(f"\n{Colors.RED}An error occurred: {e}{Colors.RESET}")
        sys.exit(1)