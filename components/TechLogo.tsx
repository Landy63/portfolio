interface TechLogoProps {
  name: string
  className?: string
}

export default function TechLogo({ name, className = "h-8 w-8" }: TechLogoProps) {
  const logoUrls: { [key: string]: string } = {
    'HTML': 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/html-bcZLxXRzDlnZfiAoTMHrcCD0kAyYUh.svg',
    'CSS': 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/css-sseTQ1bpLUnVC00CIiyKBvXPiT3VKY.svg',
    'JavaScript': 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-javascript-9JRHozqZ1RsVUJG3b59euSfTktTHRh.svg',
    'TypeScript': 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/typescript-Ys5g2fGnSJJa3CKhUPOMZ7wODdiceX.svg',
    'React': 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/react-PHvRTq8zlzs6sLaYcdaTQkNSU2Q3gz.svg',
    'Vue': 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vue-sOXqDLrcVPAg7SD2CHYRfRew6hNlqi.svg',
    'Node.js': 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nodejs-9EiAVGjpwuQtPqQ3ZkeSaiJJrnMdVo.svg',
    'Python': 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/python-5H9LPVVhcS8vSnxDkOXNedtBIcq0Ja.svg',
    'Java': 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/java-hV1aWtdxdCo7RGy4q2A7gNp0auDaik.svg',
    'PHP': 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/php-8S0mG9kWkvU4zg0aF5IlkDwdV6pbWV.svg',
    'R': 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/r-lang-n7tZTaFaWPNNxwBBhWnCmQpv1ThY2l.svg',
    'SQL': 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sql-2is1ePca759OHjdqJnFR7elEUkYwRx.svg',
    'Tailwind CSS': 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tailwind-NDNHWOjtzdHlYL4iPSVpdo4p7SQGpF.svg',
    'Next.js': 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/next-js-VV5sA1zLc5dv5SAI38GJbioNmn6Vj6.svg',
    'C': 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/c-cPXPxSk1b2HQq0YUSvRppFaUG1plML.svg',
    'C++': 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/c++-jaRPyzs0x4XYnyLwZvw5kYpIPRCW5Y.svg',
    'C#': 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/csharp-xfhFPLpEAGEroOy9gBopwuGeCs0Did.svg',
    'Go': 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/go-OU8UETi3zaauxUVJgo79u7dXQBwe7C.svg',
    'Ruby': 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ruby-o9tc5oBXXCMKGnehLBmu8SGxwe08hl.svg',
    'Rust': 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rust-rb6r6hNe37tJkBIEBezq0bqYqKzEOQ.svg',
    'Angular': 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/angular-tZuQRIPsq7Z94SebYMR0UfesIbU3o3.svg',
  }

  const logoUrl = logoUrls[name]
  
  if (!logoUrl) {
    return null
  }

  return (
    <div className="tech-logo">
      <img 
        src={logoUrl} 
        alt={`${name} logo`}
        className={className}
      />
    </div>
  )
}

