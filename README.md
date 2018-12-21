# AutoLogin
Automatic login for NowTV, because it keeps logging me out and no password manager seems to want to work with this site..

## Setup
 - Clone Repo
 - Create .env file in same folder as `manifest.json`, containing JSON with 'user' and 'pass' fields:
 
```json
{
    "user":"email@email.email",
    "pass":"password123"
}
```

 - Either: load the extension unpackaged
 - Or: package extension and load
