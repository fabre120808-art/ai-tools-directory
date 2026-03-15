-- Create tools table for AI tools directory
CREATE TABLE IF NOT EXISTS tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  official_url TEXT NOT NULL,
  summary TEXT NOT NULL,
  description TEXT,
  primary_tag VARCHAR(100) NOT NULL,
  secondary_tags JSONB DEFAULT '[]'::jsonb,
  search_aliases JSONB DEFAULT '[]'::jsonb,
  best_for JSONB DEFAULT '[]'::jsonb,
  quick_start JSONB DEFAULT '[]'::jsonb,
  pricing VARCHAR(50) NOT NULL DEFAULT '무료',
  korean_support BOOLEAN NOT NULL DEFAULT false,
  platform VARCHAR(50) NOT NULL DEFAULT '웹',
  status VARCHAR(50) NOT NULL DEFAULT 'draft',
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_tools_slug ON tools(slug);
CREATE INDEX IF NOT EXISTS idx_tools_status ON tools(status);
CREATE INDEX IF NOT EXISTS idx_tools_primary_tag ON tools(primary_tag);
CREATE INDEX IF NOT EXISTS idx_tools_featured ON tools(featured);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for auto-updating updated_at
DROP TRIGGER IF EXISTS update_tools_updated_at ON tools;
CREATE TRIGGER update_tools_updated_at
  BEFORE UPDATE ON tools
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
