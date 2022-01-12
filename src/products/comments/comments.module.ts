import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { Comment } from './comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Suggestion } from '../suggestions/suggestion.entity';
import { User } from '../../users/user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Comment, Suggestion, User])],
  providers: [CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
