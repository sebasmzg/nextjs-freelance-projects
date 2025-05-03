import {UserModel} from "../model/user.model";

export interface PUser {
    /**
     * Create new user
     * @param user The user to create
     * @returns The created user
     */
    createUser(user: UserModel): Promise<UserModel>

    /**
     * Get user by email
     * @param email user email
     * @returns The user with the given email
     */
    findUserByEmail(email: string): Promise<UserModel | null>

    /**
     * Get user by id
     * @param userId user id
     * @returns The user with the given id
     */
    findUserById(userId: string): Promise<UserModel | null>

    /**
     * Update user
     * @param user The user to update
     * @returns The updated user
     */
    updateUser(user: UserModel): Promise<UserModel>

    /**
     * Delete user
     * @param userId The user to delete
     */
    deleteUser(userId: string): Promise<void>
}