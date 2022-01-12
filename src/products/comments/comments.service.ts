import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Suggestion } from '../suggestions/suggestion.entity';
import { User } from '../../users/user.entity';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/comment-creation.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private repo: Repository<Comment>,
    @InjectRepository(Suggestion)
    private suggestionRepo: Repository<Suggestion>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(body: CreateCommentDto, user: User) {
    const comment = this.repo.create({ title: body.title, body: body.body });

    comment.user = user;

    const suggestion = await this.suggestionRepo.findOne(body.suggestionId);

    if (!suggestion) {
      throw new NotFoundException(
        'A suggestion with that id does not seem to exist.',
      );
    }

    comment.suggestion = suggestion;

    return this.repo.save(comment);
  }
}
