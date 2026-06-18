import Image from 'next/image';
import { User, Building2 } from 'lucide-react';

interface ArticleAuthorProps {
  author: {
    name: string;
    role?: string;
    avatar?: string;
  };
}

export function ArticleAuthor({ author }: ArticleAuthorProps) {
  return (
    <div className="glass-card rounded-2xl p-6 mt-10">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
        About the Author
      </p>
      <div className="flex items-start gap-4">
        {author.avatar ? (
          <Image
            src={author.avatar}
            alt={author.name}
            width={56}
            height={56}
            className="w-14 h-14 rounded-full object-cover ring-2 ring-border flex-shrink-0"
          />
        ) : (
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold/20 to-primary/20 flex items-center justify-center ring-2 ring-border flex-shrink-0">
            <User className="w-7 h-7 text-primary" />
          </div>
        )}
        <div>
          <p className="font-bold text-foreground mb-0.5">{author.name}</p>
          {author.role && (
            <p className="text-sm text-muted-foreground flex items-center gap-1.5 mb-2">
              <Building2 className="w-3.5 h-3.5" />
              {author.role}
            </p>
          )}
          <p className="text-sm text-muted-foreground leading-relaxed">
            Expert at Riyadh International Corporation with deep knowledge in medical equipment
            distribution and healthcare solutions across Saudi Arabia.
          </p>
        </div>
      </div>
    </div>
  );
}
